import fp from "fastify-plugin";
import { Env } from "../env.js";
import awsPlugin from "../libs/aws.js";

export default fp(async (fastify, opts) => {
  fastify.log.info("🚀 awsPlugin registered 🚀");
  const env = fastify.getEnvs<Env>();
  fastify.register(awsPlugin, {
    region: env.AWS_REGION,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  });
});
