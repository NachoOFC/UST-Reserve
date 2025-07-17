import { sql } from '../../db/neon';

export default defineEventHandler(async (event) => {
  // Ranking de salas más reservadas
  const top = await sql`
    SELECT study_room_id as "studyRoomId", COUNT(*) as count
    FROM reserve
    GROUP BY study_room_id
    ORDER BY count DESC
    LIMIT 3
  `;
  return top;
}); 