// server/db/neon.ts
import 'dotenv/config'; // Fuerza la carga del .env, compatible con TS
import { neon } from '@neondatabase/serverless'; // <-- Cambiado aquí

// Get runtime config (solo funcionará en contexto Nuxt, pero para debug mantenemos ambos)
let databaseUrl = process.env.DATABASE_URL;

try {
  // @ts-ignore
  const config = useRuntimeConfig?.();
  if (config && config.databaseUrl) {
    databaseUrl = config.databaseUrl;
  }
} catch (e) {
  // Si no estamos en contexto Nuxt, ignorar
}

if (!databaseUrl) {
  console.warn('⚠️  DATABASE_URL environment variable is not set. Database operations will fail.');
  console.warn('Please set DATABASE_URL in your .env file or environment variables.');
}

export const sql = neon(databaseUrl || '');
