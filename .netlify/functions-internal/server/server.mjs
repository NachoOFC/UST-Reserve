import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { w as withQuery, u as useNitroApp, n as normalizeLambdaIncomingHeaders, a as normalizeCookieHeader, b as normalizeLambdaOutgoingBody, c as normalizeLambdaOutgoingHeaders, g as getRouteRulesForPath } from './chunks/_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const nitroApp = useNitroApp();
async function lambda(event, context) {
  const query = {
    ...event.queryStringParameters,
    ...event.multiValueQueryStringParameters
  };
  const url = withQuery(event.path, query);
  const method = event.httpMethod || "get";
  const r = await nitroApp.localCall({
    event,
    url,
    context,
    headers: normalizeLambdaIncomingHeaders(event.headers),
    method,
    query,
    body: event.isBase64Encoded ? Buffer.from(event.body || "", "base64") : event.body
  });
  const cookies = normalizeCookieHeader(String(r.headers["set-cookie"]));
  const awsBody = await normalizeLambdaOutgoingBody(r.body, r.headers);
  return {
    statusCode: r.status,
    headers: normalizeLambdaOutgoingHeaders(r.headers, true),
    body: awsBody.body,
    isBase64Encoded: awsBody.type === "binary",
    ...cookies.length > 0 && {
      multiValueHeaders: { "set-cookie": cookies }
    }
  };
}

const handler = async function handler2(event, context) {
  const query = {
    ...event.queryStringParameters,
    ...event.multiValueQueryStringParameters
  };
  const url = withQuery(event.path, query);
  const routeRules = getRouteRulesForPath(url);
  if (routeRules.isr) {
    const builder = await import('@netlify/functions').then(
      (r) => r.builder || r.default.builder
    );
    const ttl = typeof routeRules.isr === "number" ? routeRules.isr : false;
    const builderHandler = ttl ? (event2, context2) => lambda(event2, context2).then((r) => ({ ...r, ttl })) : lambda;
    return builder(builderHandler)(event, context);
  }
  return lambda(event, context);
};

export { handler };
//# sourceMappingURL=server.mjs.map
