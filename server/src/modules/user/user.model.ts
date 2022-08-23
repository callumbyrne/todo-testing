import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { TodoDocument } from "../todo/todo.model";

export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    todos: TodoDocument["_id"][];
    comparePassword(givenPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Todo",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (
    givenPassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(givenPassword, user.password).catch((_e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
