import { d as defineEventHandler, r as readBody } from '../../_/nitro.mjs';
import { a as getAllStudyRooms, c as createStudyRoom } from '../../_/studyRooms.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@netlify/neon';

const index = defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    return await getAllStudyRooms();
  }
  if (event.req.method === "POST") {
    const body = await readBody(event);
    return await createStudyRoom(body.name, body.number);
  }
  return { statusCode: 405, message: "Method Not Allowed" };
});

export { index as default };
//# sourceMappingURL=index.mjs.map
