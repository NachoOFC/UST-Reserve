require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function removeLocationColumn() {
  try {
    await sql`ALTER TABLE study_rooms DROP COLUMN IF EXISTS location;`;
    console.log('Columna location eliminada correctamente.');
  } catch (error) {
    console.error('Error al eliminar la columna location:', error);
  }
}

removeLocationColumn(); 