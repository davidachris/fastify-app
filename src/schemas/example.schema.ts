import type { FromSchema } from "json-schema-to-ts";

export const exampleSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
} as const;
export type ExampleSchema = FromSchema<typeof exampleSchema>;
