import fp from "fastify-plugin";

// Define the type for route config
type AuthRouteConfig = {
  authRequired?: boolean;
};

export default fp(async (fastify) => {
  fastify.log.info("🚀 authPlugin registered 🚀");
  fastify.addHook("onRequest", async (request, reply) => {
    const routeConfig = (request.routeOptions?.config as AuthRouteConfig) || {};
    if (!routeConfig.authRequired) return;
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }
  });
});
