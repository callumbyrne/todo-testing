import { boolean, object, string } from "zod";

const payload = {
    body: object({
        content: string({
            required_error: "Content is required",
        }),
    }),
};

const params = {
    params: object({
        todoId: string({
            required_error: "productId is required",
        }),
    }),
};

export const createTodoSchema = object({
    ...payload,
});

export const updateTodoSchema = object({
    body: object({
        completed: boolean({
            required_error: "Completed is required",
        }),
    }),
    ...params,
});
