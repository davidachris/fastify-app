import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { FromSchema } from "json-schema-to-ts";

const envSchema = {
  type: "object",
  properties: {
    DATABASE_URI: { type: "string", minLength: 1 },
    COOKIE_SECRET: { type: "string", minLength: 1 },
    AWS_REGION: { type: "string", minLength: 1 },
    AWS_ACCESS_KEY_ID: { type: "string" },
    AWS_SECRET_ACCESS_KEY: { type: "string" },
  },
  required: ["DATABASE_URI", "AWS_REGION", "COOKIE_SECRET"],
} as const;

export type Env = FromSchema<typeof envSchema>;

export default fp(async (fastify) => {
  fastify.log.info("🚀 envPlugin registered 🚀");
  fastify.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });
});
