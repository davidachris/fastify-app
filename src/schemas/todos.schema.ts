import type { FromSchema } from "json-schema-to-ts";
import mongoose, { Types } from "mongoose";

export const todoPostSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
    description: { type: "string", maxLength: 200 },
    isCompleted: { type: "boolean", default: false },
  },
  required: ["title", "description"],
} as const;
export type TodoPostSchema = FromSchema<typeof todoPostSchema>;

const todoDtoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  userId: { type: Types.ObjectId, required: true },
});

export const Todo = mongoose.model("Todo", todoDtoSchema, "todos");
