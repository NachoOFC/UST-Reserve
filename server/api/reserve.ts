import { sql } from '../db/neon';

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    return { statusCode: 405, message: 'Method Not Allowed' };
  }
  const body = await readBody(event);
  // Crear tabla si no existe
  await sql`
    CREATE TABLE IF NOT EXISTS reservas (
      id SERIAL PRIMARY KEY,
      roomId INTEGER,
      name TEXT,
      email TEXT,
      date DATE,
      time TEXT,
      duration TEXT
    )`;
  // Insertar reserva
  await sql`
    INSERT INTO reservas (roomId, name, email, date, time, duration)
    VALUES (${body.roomId}, ${body.name}, ${body.email}, ${body.date}, ${body.time}, ${body.duration})`;
  return { success: true };
}); 