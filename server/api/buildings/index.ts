import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    try {
      return await sql`SELECT * FROM buildings ORDER BY id ASC`;
    } catch (error) {
      console.error('Error en GET /api/buildings:', error);
      return { statusCode: 500, message: 'Error interno al obtener edificios' };
    }
  }
  return { statusCode: 405, message: 'Method Not Allowed' };
});
