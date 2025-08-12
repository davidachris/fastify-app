import fastifyHelmet from "@fastify/helmet";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.log.info("🚀 helmetPlugin registered 🚀");
  fastify.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
      },
      useDefaults: true,
      reportOnly: false,
    },
  });
});
