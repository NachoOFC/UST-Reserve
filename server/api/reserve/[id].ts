import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  try {
    if (event.method !== 'DELETE') {
      return { error: 'Método no permitido' };
    }

    // Obtener ID de la reserva desde la ruta
    const reservationId = event.context.params?.id;
    if (!reservationId) {
      return { error: 'ID de reserva requerido' };
    }

    // Obtener email del body (para verificar que sea del usuario)
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
      return { error: 'Email requerido para verificar permisos' };
    }

    // Buscar usuario por email
    const users = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return { error: 'Usuario no encontrado' };
    }

    const userId = users[0].id;

    // Verificar que la reserva pertenece al usuario
    const reservation = await sql`
      SELECT * FROM reserve 
      WHERE id = ${reservationId} AND user_id = ${userId}
    `;

    if (reservation.length === 0) {
      return { error: 'Reserva no encontrada o no tienes permiso para cancelarla' };
    }

    // Verificar que la reserva sea futura (no se puede cancelar una pasada)
    const resDate = new Date(reservation[0].reservation_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (resDate < today) {
      return { error: 'No puedes cancelar una reserva pasada' };
    }

    // Eliminar la reserva
    await sql`DELETE FROM reserve WHERE id = ${reservationId}`;

    return { success: true, message: 'Reserva cancelada exitosamente' };
  } catch (err) {
    console.error('Error en DELETE /api/reserve/[id]:', err);
    return { error: 'Error al cancelar reserva' };
  }
});
