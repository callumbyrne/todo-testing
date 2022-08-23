import mongoose from "mongoose";
import { UserDocument } from "../user/user.model";

export interface TodoDocument extends mongoose.Document {
    user: UserDocument["_id"];
    content: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);

export default TodoModel;
