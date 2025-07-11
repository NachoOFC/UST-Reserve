require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    console.log('Conexión exitosa. Versión de PostgreSQL:', version);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

main();