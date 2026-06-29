import { sql } from '../db/neon';

export default defineEventHandler(async (event) => {
  try {
    if (event.method !== 'POST') {
      return { error: 'Método no permitido' };
    }
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      return { error: 'Faltan email o password' };
    }

    const users = await sql`SELECT id, name, email, password, role FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return { error: 'Usuario o contraseña incorrectos' };
    }
    const user = users[0];

    if (!user.password) {
      return { error: 'Este usuario no tiene contraseña asignada. Contacta a soporte o regístrate correctamente.' };
    }

    if (user.password !== password) {
      return { error: 'Usuario o contraseña incorrectos' };
    }
    // Retornar usuario sin password
    const { password: _, ...userSafe } = user;
    return { user: userSafe };
  } catch (err) {
    console.error('Error en /api/login:', err);
    return { error: 'Error interno del servidor (login)' };
  }
}); 