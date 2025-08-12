import { FastifyPluginAsync } from "fastify";
import { TodoPostSchema, todoPostSchema } from "../../../schemas/todos.schema.js";

const todo: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const todoService = fastify.todoService;

  fastify.get(
    "/:uid",
    {
      schema: {
        params: {
          type: "object",
          properties: { uid: { type: "string", minLength: 1 } },
          required: ["uid"],
        },
        querystring: {
          type: "object",
          properties: {
            id: { type: "string", minLength: 1 },
          },
        },
      },
    },
    async (request, reply) => {
      const { uid } = request.params as { uid: string };
      const { id } = request.query as { id: string | undefined };
      if (!id) {
        const todos = await todoService.getAllTodos(uid);
        return todos;
      }
      const todo = await todoService.getTodoById(id, uid);
      return todo;
    },
  );

  fastify.post(
    "/:uid",
    {
      schema: {
        body: todoPostSchema,
        params: {
          type: "object",
          properties: { uid: { type: "string", minLength: 1 } },
          required: ["uid"],
        },
      },
    },
    async (request, reply) => {
      const { uid } = request.params as { uid: string };
      const body = request.body as TodoPostSchema;
      const todos = await todoService.createTodo(uid, body);
      return todos;
    },
  );
};

export default todo;
