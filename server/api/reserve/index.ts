import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  try {
    if (event.method === 'GET') {
      const { studyRoomId, fecha } = getQuery(event);
      if (studyRoomId && fecha) {
        const reservas = await sql`
          SELECT start_time FROM reserve
          WHERE study_room_id = ${studyRoomId}
            AND reservation_date = ${fecha}
        `;
        const reservedHours = reservas.map(r => r.start_time.slice(0,5));
        return { reservedHours };
      }
      if (event.req.url?.endsWith('/top')) {
        // Ranking de salas más reservadas
        const top = await sql`
          SELECT study_room_id as "studyRoomId", COUNT(*) as count
          FROM reserve
          GROUP BY study_room_id
          ORDER BY count DESC
          LIMIT 3
        `;
        return top;
      }
      return { reservedHours: [] };
    }
    if (event.method !== 'POST') {
      return { error: 'Método no permitido' };
    }
    const body = await readBody(event);
    const { nombre, email, fecha, hora, studyRoomId } = body;

    // Validar fecha (no puede ser anterior a hoy)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaReserva = new Date(fecha);
    if (fechaReserva < hoy) {
      return { error: 'No puedes reservar para un día anterior a hoy.' };
    }

    // Validar hora (solo entre 08:00 y 16:00)
    const [horaInicio, minutosInicio] = hora.split(':').map(Number);
    if (horaInicio < 8 || horaInicio >= 16) {
      return { error: 'Solo puedes reservar entre las 08:00 y las 15:30.' };
    }

    // Duración fija de 1 hora
    const horaFin = `${String(horaInicio + 1).padStart(2, '0')}:${minutosInicio.toString().padStart(2, '0')}:00`;
    const horaInicioStr = `${String(horaInicio).padStart(2, '0')}:${minutosInicio.toString().padStart(2, '0')}:00`;

    // Buscar o crear usuario
    let user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      user = await sql`INSERT INTO users (name, email) VALUES (${nombre}, ${email}) RETURNING *`;
    }

    // Verificar disponibilidad (no debe haber traslape en ese horario)
    const reservas = await sql`
      SELECT * FROM reserve
      WHERE study_room_id = ${studyRoomId}
        AND reservation_date = ${fecha}
        AND (
          (start_time <= ${horaInicioStr} AND end_time > ${horaInicioStr}) OR
          (start_time < ${horaFin} AND end_time >= ${horaFin}) OR
          (start_time >= ${horaInicioStr} AND end_time <= ${horaFin})
        )
    `;
    if (reservas.length > 0) {
      return { error: 'La sala ya está reservada en ese horario.' };
    }

    // Verificar que la sala esté disponible
    const sala = await sql`SELECT * FROM study_rooms WHERE id = ${studyRoomId}`;
    if (!sala[0] || sala[0].available === false) {
      return { error: 'Esta sala no está disponible para reservas en este momento.' };
    }

    // Crear reserva
    await sql`
      INSERT INTO reserve (reservation_date, start_time, end_time, study_room_id, user_id)
      VALUES (${fecha}, ${horaInicioStr}, ${horaFin}, ${studyRoomId}, ${user[0].id})
    `;

    return { success: true };
  } catch (err) {
    console.error('Error en /api/reserve:', err);
    return { error: 'Error interno del servidor' };
  }
}); 