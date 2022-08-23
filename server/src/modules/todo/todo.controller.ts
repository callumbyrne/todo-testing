import { Request, Response } from "express";
import { createTodo } from "./todo.service";
import logger from "../../utils/logger";

export const createTodoHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        const todo = await createTodo(userId, req.body.content);
        return res.status(201).send(todo);
    } catch (error: any) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
};
