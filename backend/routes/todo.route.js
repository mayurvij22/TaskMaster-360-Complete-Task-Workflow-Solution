import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";
import sendEmailData from "../middleware/sendEmailData.js";

const router = express.Router();

router.post("/create", authenticate, createTodo, sendEmailData);
router.get("/fetch", authenticate, getTodos);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
