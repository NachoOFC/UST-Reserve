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
      if (!body.name || !body.number || !body.capacity || !body.building_id) {
        return { statusCode: 400, message: 'Faltan datos obligatorios' };
      }
      // Cast de tipos
      const name = String(body.name);
      const number = Number(body.number);
      const capacity = Number(body.capacity);
      const available = body.available === 'false' ? false : Boolean(body.available);
      const buildingId = Number(body.building_id);
      const result = await createStudyRoom(
        name, 
        number, 
        capacity, 
        available,
        buildingId
      );
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