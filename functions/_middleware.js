export async function onRequest({ request, env, next }) {
  const auth = request.headers.get("Authorization") || "";
  const expected = "Basic " + btoa(`${env.SITE_USER}:${env.SITE_PASS}`);
  if (env.SITE_USER && env.SITE_PASS && auth === expected) {
    return next();
  }
  return new Response("Απαιτείται σύνδεση", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="gavrili", charset="UTF-8"' },
  });
}