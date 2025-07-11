// server/queries/studyRooms.ts
import { sql } from '../db/neon';

// Obtener todas las salas
export async function getAllStudyRooms() {
  try {
    const rooms = await sql`SELECT * FROM study_rooms ORDER BY id ASC`;
    return rooms;
  } catch (error) {
    console.error('Database error in getAllStudyRooms:', error);
    throw new Error('Failed to fetch study rooms from database');
  }
}

// Obtener una sala por ID
export async function getStudyRoomById(id: number) {
  try {
    const [room] = await sql`SELECT * FROM study_rooms WHERE id = ${id}`;
    return room;
  } catch (error) {
    console.error('Database error in getStudyRoomById:', error);
    throw new Error('Failed to fetch study room from database');
  }
}

// Crear una sala nueva
export async function createStudyRoom(name: string, number: number) {
  try {
    const [room] = await sql`
      INSERT INTO study_rooms (name, number)
      VALUES (${name}, ${number})
      RETURNING *`;
    return room;
  } catch (error) {
    console.error('Database error in createStudyRoom:', error);
    throw new Error('Failed to create study room in database');
  }
}
