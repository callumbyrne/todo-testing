import { Request, Response } from "express";
import { createTodo, findAndUpdateTodo, findTodo } from "./todo.service";
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

export const updateTodoHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;
        const todoId = req.params.todoId;
        const completed = req.body.completed;

        const todo = await findTodo({ _id: todoId });
        const updatedTodo = { ...todo, completed };

        if (!todo) {
            return res.sendStatus(404);
        }

        if (String(todo.user) !== userId) {
            return res.sendStatus(403);
        }

        const returnedUpdatedTodo = await findAndUpdateTodo(
            { _id: todoId },
            updatedTodo,
            {
                new: true,
            }
        );

        return res.status(201).send(returnedUpdatedTodo);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error });
    }
};
