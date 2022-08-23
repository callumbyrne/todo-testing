import express from "express";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResource";
import { createTodoHandler } from "./todo.controller";
import { createTodoSchema } from "./todo.schema";

const router = express.Router();

router.post(
    "/",
    requireUser,
    validateResource(createTodoSchema),
    createTodoHandler
);

export = router;
