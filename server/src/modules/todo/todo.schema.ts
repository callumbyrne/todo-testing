import { object, string } from "zod";

export const createTodoSchema = object({
    body: object({
        content: string({
            required_error: "Content is required",
        }),
    }),
});
