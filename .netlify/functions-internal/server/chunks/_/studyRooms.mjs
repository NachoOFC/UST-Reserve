import { e as useRuntimeConfig } from './nitro.mjs';
import { neon } from '@netlify/neon';

var _a;
console.log("coneccion aaaaaaaa process.env.DATABASE_URL:", process.env.DATABASE_URL);
let databaseUrl = process.env.DATABASE_URL;
try {
  const config = (_a = useRuntimeConfig) == null ? void 0 : _a();
  if (config && config.databaseUrl) {
    console.log("config.databaseUrl:", config.databaseUrl);
    databaseUrl = config.databaseUrl;
  }
} catch (e) {
}
console.log("databaseUrl used:", databaseUrl);
if (!databaseUrl) {
  console.warn("\u26A0\uFE0F  DATABASE_URL environment variable is not set. Database operations will fail.");
  console.warn("Please set DATABASE_URL in your .env file or environment variables.");
}
const sql = neon(databaseUrl || "");

async function getAllStudyRooms() {
  try {
    const rooms = await sql`SELECT * FROM study_rooms ORDER BY id ASC`;
    return rooms;
  } catch (error) {
    console.error("Database error in getAllStudyRooms:", error);
    throw new Error("Failed to fetch study rooms from database");
  }
}
async function getStudyRoomById(id) {
  try {
    const [room] = await sql`SELECT * FROM study_rooms WHERE id = ${id}`;
    return room;
  } catch (error) {
    console.error("Database error in getStudyRoomById:", error);
    throw new Error("Failed to fetch study room from database");
  }
}
async function createStudyRoom(name, number) {
  try {
    const [room] = await sql`
      INSERT INTO study_rooms (name, number)
      VALUES (${name}, ${number})
      RETURNING *`;
    return room;
  } catch (error) {
    console.error("Database error in createStudyRoom:", error);
    throw new Error("Failed to create study room in database");
  }
}
async function updateStudyRoom(id, name, number) {
  try {
    const [room] = await sql`
      UPDATE study_rooms
      SET name = ${name}, number = ${number}
      WHERE id = ${id}
      RETURNING *`;
    return room;
  } catch (error) {
    console.error("Database error in updateStudyRoom:", error);
    throw new Error("Failed to update study room in database");
  }
}
async function deleteStudyRoom(id) {
  try {
    await sql`DELETE FROM study_rooms WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error("Database error in deleteStudyRoom:", error);
    throw new Error("Failed to delete study room from database");
  }
}

export { getAllStudyRooms as a, createStudyRoom as c, deleteStudyRoom as d, getStudyRoomById as g, updateStudyRoom as u };
//# sourceMappingURL=studyRooms.mjs.map
