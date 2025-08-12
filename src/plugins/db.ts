import fp from "fastify-plugin";
import { Env } from "../env.js";
import mongoose from "mongoose";

export default fp(async (fastify) => {
  fastify.log.info("🚀 dbPlugin Registered 🚀");
  const env = fastify.getEnvs<Env>();
  if (env.DATABASE_URI !== "SKIP") {
    await mongoose.connect(env.DATABASE_URI);
  }

  fastify.addHook("onClose", async (fastify) => {
    if (env.DATABASE_URI !== "SKIP") {
      await mongoose.disconnect();
    }
  });
});
