import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import Login from "../controllers/Login.controller.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { GetTodos } from "../controllers/TodoList.controller.js";
import MarkTodo from "../controllers/MarkTodo.controller.js";
import RemoveTodo from "../controllers/RemoveTodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema, Register);
apiRoute.post('/login', LoginSchema, Login);

apiProtected.post("/createTodo", createTodo);
apiProtected.post("/marktodo", MarkTodo);
apiProtected.post("/deleteTodo", RemoveTodo);
apiProtected.get("/todolist", GetTodos);

export default apiRoute;