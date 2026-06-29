import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  try {
    // Obtener email del query (el frontend lo envía desde localStorage)
    const query = getQuery(event);
    const email = query.email as string;
    
    if (!email || email === 'undefined' || email === 'null') {
      return { 
        error: 'Email es requerido para obtener reservas',
        reservations: [],
        active: [],
        past: []
      };
    }

    // Buscar usuario por email
    const users = await sql`SELECT id, name, email FROM users WHERE email = ${email}`;
    
    if (users.length === 0) {
      return { 
        reservations: [],
        active: [],
        past: []
      };
    }

    const userId = users[0].id;

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
    
    if (reservations.length === 0) {
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

    return { 
      reservations: [...active, ...past],
      active,
      past 
    };
  } catch (err: any) {
    return { 
      error: 'Error al obtener reservas',
      reservations: [],
      active: [],
      past: []
    };
  }
});
