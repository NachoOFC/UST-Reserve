require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function updateSchema() {
  try {
    console.log('Verificando estructura de la tabla study_rooms...');
    
    // Verificar si la tabla existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'study_rooms'
      );
    `;
    
    if (!tableExists[0].exists) {
      console.log('Creando tabla study_rooms...');
      await sql`
        CREATE TABLE study_rooms (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          capacity INTEGER NOT NULL,
          available BOOLEAN DEFAULT true,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      console.log('Tabla study_rooms creada exitosamente.');
    } else {
      console.log('La tabla study_rooms ya existe.');
      
      // Verificar si los campos necesarios existen
      const columns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'study_rooms' 
        AND table_schema = 'public';
      `;
      
      const columnNames = columns.map(col => col.column_name);
      console.log('Columnas existentes:', columnNames);
      
      // Agregar campos faltantes si es necesario
      if (!columnNames.includes('location')) {
        console.log('Agregando columna location...');
        await sql`ALTER TABLE study_rooms ADD COLUMN location VARCHAR(255) NOT NULL DEFAULT 'Ubicación no especificada';`;
      }
      
      if (!columnNames.includes('capacity')) {
        console.log('Agregando columna capacity...');
        await sql`ALTER TABLE study_rooms ADD COLUMN capacity INTEGER NOT NULL DEFAULT 10;`;
      }
      
      if (!columnNames.includes('available')) {
        console.log('Agregando columna available...');
        await sql`ALTER TABLE study_rooms ADD COLUMN available BOOLEAN DEFAULT true;`;
      }
      
      if (!columnNames.includes('description')) {
        console.log('Agregando columna description...');
        await sql`ALTER TABLE study_rooms ADD COLUMN description TEXT;`;
      }
      
      if (!columnNames.includes('created_at')) {
        console.log('Agregando columna created_at...');
        await sql`ALTER TABLE study_rooms ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;
      }
      
      if (!columnNames.includes('updated_at')) {
        console.log('Agregando columna updated_at...');
        await sql`ALTER TABLE study_rooms ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`;
      }
    }
    
    // Insertar algunos datos de ejemplo si la tabla está vacía
    const count = await sql`SELECT COUNT(*) as count FROM study_rooms;`;
    if (count[0].count === 0) {
      console.log('Insertando datos de ejemplo...');
      await sql`
        INSERT INTO study_rooms (name, location, capacity, available, description) VALUES
        ('Sala de Estudio A101', 'Edificio A - Piso 1', 20, true, 'Sala equipada con proyector y pizarra'),
        ('Sala de Estudio B205', 'Edificio B - Piso 2', 15, true, 'Sala silenciosa para estudio individual'),
        ('Sala de Reuniones C301', 'Edificio C - Piso 3', 30, false, 'Sala para presentaciones y reuniones grupales'),
        ('Sala de Computación D102', 'Edificio D - Piso 1', 25, true, 'Sala con computadoras y acceso a internet'),
        ('Sala de Estudio E401', 'Edificio E - Piso 4', 12, true, 'Sala con vista panorámica y ambiente tranquilo');
      `;
      console.log('Datos de ejemplo insertados exitosamente.');
    }
    
    console.log('Estructura de la base de datos actualizada correctamente.');
    
  } catch (error) {
    console.error('Error al actualizar el esquema:', error);
  }
}

updateSchema(); 