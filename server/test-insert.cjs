require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testInsert() {
  try {
    const [room] = await sql`
      INSERT INTO study_rooms (name, location, capacity, available, description)
      VALUES ('Sala Test Script', 'Edificio Script', 99, true, 'Insertada desde script Node')
      RETURNING *`;
    console.log('Insert OK:', room);
  } catch (error) {
    console.error('Error al insertar:', error);
  }
}

testInsert(); 