import fp from "fastify-plugin";
import { DeleteResult, Document, ObjectId, WithId } from "mongodb";
import { Todo, TodoPostSchema } from "../schemas/todos.schema.js";

export default fp(async (fastify) => {
  fastify.log.info("🚀 todoService Registered 🚀");

  const getAllTodos = async (userId: string) => {
    const todos = await Todo.find({ userId: new ObjectId(userId) });
    return todos;
  };

  const getTodoById = async (id: string, userId: string) => {
    const todo = await Todo.findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
    return todo;
  };

  const createTodo = async (uId: string, todoPost: TodoPostSchema) => {
    const todo = new Todo({
      userId: new ObjectId(uId),
      ...todoPost,
    });
    return todo.save(); // Return the saved document
  };

  const deleteTodoById = async (id: string, userId: string) => {
    const result = await Todo.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    return result;
  };

  const deleteUserTodos = async (userId: string) => {
    const result = await Todo.deleteMany({ userId: new ObjectId(userId) });
    return result;
  };

  fastify.decorate("todoService", {
    getAllTodos,
    getTodoById,
    createTodo,
    deleteTodoById,
    deleteUserTodos,
  });
});

declare module "fastify" {
  interface FastifyInstance {
    todoService: {
      getAllTodos: (userId: string) => Promise<WithId<Document>[] | undefined>;
      getTodoById: (id: string, userId: string) => Promise<WithId<Document> | null | undefined>;
      createTodo: (uId: string, todoPost: TodoPostSchema) => Promise<WithId<Document>>;
      deleteTodoById: (id: string, userId: string) => Promise<DeleteResult | undefined>;
      deleteUserTodos: (userId: string) => Promise<DeleteResult | undefined>;
    };
  }
}
