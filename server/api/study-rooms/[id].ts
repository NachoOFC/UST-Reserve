import { getStudyRoomById, updateStudyRoom, deleteStudyRoom } from '~/server/queries/studyRooms';

export default defineEventHandler(async (event) => {
  // 1. Obtener el id de la sala desde la URL de forma segura
  const id = Number(event.context.params?.id);
  if (!id) {
    return { statusCode: 400, message: 'ID inválido' };
  }

  // 2. Manejar GET: obtener una sala por id
  if (event.req.method === 'GET') {
    return await getStudyRoomById(id);
  }

  // 3. Manejar PUT: actualizar una sala
  if (event.req.method === 'PUT') {
    const body = await readBody(event);
    return await updateStudyRoom(
      id, 
      body.name, 
      body.number, 
      body.capacity, 
      body.available, 
      body.description
    );
  }

  // 4. Manejar DELETE: eliminar una sala
  if (event.req.method === 'DELETE') {
    return await deleteStudyRoom(id);
  }

  // 5. Si el método no es soportado
  return { statusCode: 405, message: 'Method Not Allowed' };
}); 