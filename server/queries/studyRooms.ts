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

// Actualizar una sala
export async function updateStudyRoom(id: number, name: string, number: number) {
  try {
    const [room] = await sql`
      UPDATE study_rooms
      SET name = ${name}, number = ${number}
      WHERE id = ${id}
      RETURNING *`;
    return room;
  } catch (error) {
    console.error('Database error in updateStudyRoom:', error);
    throw new Error('Failed to update study room in database');
  }
}

// Eliminar una sala
export async function deleteStudyRoom(id: number) {
  try {
    await sql`DELETE FROM study_rooms WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Database error in deleteStudyRoom:', error);
    throw new Error('Failed to delete study room from database');
  }
}
