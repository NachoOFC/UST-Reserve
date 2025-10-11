import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  try {
    // Obtener email del query (el frontend lo envía desde localStorage)
    const query = getQuery(event);
    const email = query.email as string;
    
    console.log('📧 Email recibido:', email);
    console.log('🔍 Query completo:', query);
    
    if (!email || email === 'undefined' || email === 'null') {
      console.error('❌ Email no proporcionado o inválido:', email);
      return { 
        error: 'Email es requerido para obtener reservas',
        reservations: [],
        active: [],
        past: []
      };
    }

    // Buscar usuario por email
    const users = await sql`SELECT id, name, email FROM users WHERE email = ${email}`;
    console.log('👤 Usuarios encontrados:', users.length);
    
    if (users.length === 0) {
      console.log('⚠️ Usuario no encontrado para email:', email);
      return { 
        reservations: [],
        active: [],
        past: []
      };
    }

    const userId = users[0].id;
    console.log('🆔 User ID:', userId, '| Nombre:', users[0].name);

    // Obtener todas las reservas del usuario (futuras y pasadas)
    const reservations = await sql`
      SELECT 
        r.id,
        r.reservation_date,
        r.start_time,
        r.end_time,
        COALESCE(s.name, 'Sala no disponible') as room_name,
        COALESCE(s.number::text, 'N/A') as room_number,
        COALESCE(b.name, 'Edificio desconocido') as building_name,
        COALESCE(s.capacity, 0) as room_capacity
      FROM reserve r
      LEFT JOIN study_rooms s ON r.study_room_id = s.id
      LEFT JOIN buildings b ON s.building_id = b.id
      WHERE r.user_id = ${userId}
      ORDER BY r.reservation_date DESC, r.start_time DESC
    `;
    
    console.log('📋 Reservas encontradas en BD:', reservations.length);

    // Si no hay reservas, retornar arrays vacíos (esto es NORMAL, no es un error)
    if (reservations.length === 0) {
      console.log('✅ Usuario sin reservas (esto es normal)');
      return {
        reservations: [],
        active: [],
        past: []
      };
    }

    // Clasificar en activas (futuras) y pasadas
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const active = [];
    const past = [];

    for (const res of reservations) {
      const resDate = new Date(res.reservation_date);
      if (resDate >= today) {
        active.push({ ...res, status: 'active' });
      } else {
        past.push({ ...res, status: 'completed' });
      }
    }

    console.log('✅ Clasificación:', { activas: active.length, pasadas: past.length });

    return { 
      reservations: [...active, ...past],
      active,
      past 
    };
  } catch (err: any) {
    console.error('💥 Error en /api/reserve/my:', err);
    console.error('💥 Stack trace:', err.stack);
    console.error('💥 Mensaje:', err.message);
    return { 
      error: 'Error al obtener reservas',
      reservations: [],
      active: [],
      past: []
    };
  }
});
