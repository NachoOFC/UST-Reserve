import { getAllStudyRooms, createStudyRoom } from '~/server/queries/studyRooms';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      return await getAllStudyRooms();
    } catch (error) {
      console.error('Error en GET /api/study-rooms:', error);
      return { statusCode: 500, message: 'Error interno al obtener salas'};
    }
  }
  if (event.req.method === 'POST') {
    try {
      const body = await readBody(event);
      console.log('Datos recibidos en POST /api/study-rooms:', body);
      // Validar datos mínimos
      if (!body.name || !body.number || !body.capacity) {
        console.error('Faltan datos obligatorios para crear la sala wuaaaaa');
        return { statusCode: 400, message: 'Faltan datos * AAAAAAAAAA' };
      }
      // Cast de tipos
      const name = String(body.name);
      const number = Number(body.number);
      const capacity = Number(body.capacity);
      const available = body.available === 'false' ? false : Boolean(body.available);
      const result = await createStudyRoom(
        name, 
        number, 
        capacity, 
        available
      );
      console.log('Resultado de createStudyRoom:', result);
      return result;
    } catch (error) {
      console.error('Error en POST /api/study-rooms:', error);
      return {
        statusCode: 500,
        message: "Error interno al crear la sala",
      };
    }
  }
  return { statusCode: 405, message: 'Method Not Allowed' };
}); 