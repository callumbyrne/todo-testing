import TodoModel, { TodoDocument } from "./todo.model";
import UserModel from "../user/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export const createTodo = async (userId: string, content: string) => {
    try {
        const todo = await TodoModel.create({ user: userId, content });

        const foundUser = await UserModel.findById(userId);

        if (foundUser) {
            foundUser.todos = foundUser.todos.concat(todo._id);
            await foundUser.save();
        }

        return todo.toJSON();
    } catch (error: any) {
        throw new Error(error);
    }
};

export const findTodo = (
    query: FilterQuery<TodoDocument>,
    options: QueryOptions = { lean: true }
) => {
    return TodoModel.findOne(query, {}, options);
};

export const findAndUpdateTodo = (
    query: FilterQuery<TodoDocument>,
    update: UpdateQuery<TodoDocument>,
    options: QueryOptions
) => {
    return TodoModel.findOneAndUpdate(query, update, options);
};
