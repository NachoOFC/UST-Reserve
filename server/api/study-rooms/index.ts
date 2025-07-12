import { getAllStudyRooms, createStudyRoom } from '~/server/queries/studyRooms';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await getAllStudyRooms();
  }
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    return await createStudyRoom(body.name, body.number);
  }
  return { statusCode: 405, message: 'Method Not Allowed' };
}); 