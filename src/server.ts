import fastify from "fastify";
import app from "./app.js";

const server = fastify({
  trustProxy: true,
  keepAliveTimeout: 30000,
  logger: true,
});
server.register(app);
server.listen({ port: 3000, host: "::" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
