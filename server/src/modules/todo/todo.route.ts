import express from "express";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResource";
import {
    createTodoHandler,
    deleteTodoHandler,
    updateTodoHandler,
} from "./todo.controller";
import {
    createTodoSchema,
    deleteTodoSchema,
    updateTodoSchema,
} from "./todo.schema";

const router = express.Router();

router.post(
    "/",
    requireUser,
    validateResource(createTodoSchema),
    createTodoHandler
);

router.put(
    "/:todoId",
    requireUser,
    validateResource(updateTodoSchema),
    updateTodoHandler
);

router.delete(
    "/:todoId",
    requireUser,
    validateResource(deleteTodoSchema),
    deleteTodoHandler
);

export = router;
