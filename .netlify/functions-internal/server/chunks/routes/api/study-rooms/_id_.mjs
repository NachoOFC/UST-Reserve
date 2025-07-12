import { d as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
import { g as getStudyRoomById, u as updateStudyRoom, d as deleteStudyRoom } from '../../../_/studyRooms.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@netlify/neon';

const _id_ = defineEventHandler(async (event) => {
  var _a;
  const id = Number((_a = event.context.params) == null ? void 0 : _a.id);
  if (!id) {
    return { statusCode: 400, message: "ID inv\xE1lido" };
  }
  if (event.req.method === "GET") {
    return await getStudyRoomById(id);
  }
  if (event.req.method === "PUT") {
    const body = await readBody(event);
    return await updateStudyRoom(id, body.name, body.number);
  }
  if (event.req.method === "DELETE") {
    return await deleteStudyRoom(id);
  }
  return { statusCode: 405, message: "Method Not Allowed" };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
