import fastifyEtag from "@fastify/etag";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.log.info("🚀 etagPlugin registered 🚀");
  fastify.register(fastifyEtag);
});
