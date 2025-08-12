import fp from "fastify-plugin";
import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";
import { Env } from "../env.js";

export default fp(async (fastify) => {
  const env = fastify.getEnvs<Env>();
  fastify.log.info("🍪 cookiePlugin registered 🍪");

  fastify.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);
});
