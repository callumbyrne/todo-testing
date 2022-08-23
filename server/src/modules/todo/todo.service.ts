import TodoModel from "./todo.model";
import UserModel from "../user/user.model";

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
