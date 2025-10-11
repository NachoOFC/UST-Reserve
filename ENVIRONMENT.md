# Configuración de variables de entorno

Si ves el error:

WARN  Please set DATABASE_URL in your .env file or environment variables.

Es porque la aplicación no encuentra la variable `DATABASE_URL` necesaria para conectarse a la base de datos Neon (Postgres).

Pasos rápidos:

1. Copia el archivo de ejemplo a `.env`:

   - En PowerShell:

     Copy-Item .env.example .env

2. Abre `.env` y pega la cadena de conexión proporcionada por Neon en `DATABASE_URL=`.

   Ejemplo:

   DATABASE_URL=postgresql://username:password@host:5432/defaultdb

3. Inicia la app de desarrollo (por ejemplo `npm run dev`). Si sigue sin detectarla, verifica desde PowerShell:

   - Mostrar la variable (temporalmente para la sesión):

     $env:DATABASE_URL

   - O arrancar el proceso con la variable inline:

     $env:DATABASE_URL = 'postgresql://username:password@host:5432/defaultdb'; npm run dev

Netlify:

- En Netlify UI añade la variable `NETLIFY_DATABASE_URL` en Site settings → Build & deploy → Environment.
- En `nuxt.config.ts` se expone `NETLIFY_DATABASE_URL` como `databaseUrl` en runtime; asegúrate de que Netlify use el nombre correcto.

Notas de seguridad:

- Nunca subas `.env` al repositorio. `.gitignore` ya lo excluye.
- Usa `.env.example` para compartir la estructura de variables sin valores.
