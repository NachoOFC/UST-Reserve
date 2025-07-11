//enpoint
// server/api/study-rooms.ts
import { getAllStudyRooms } from '~/server/queries/studyRooms';

export default defineEventHandler(async (event) => {
  try {
    return await getAllStudyRooms();
  } catch (error) {
    console.error('Error fetching study rooms:', error);
    
    // Return a proper error response
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection error. Please check your DATABASE_URL configuration.',
    });
  }
});
