import UserModel, { UserDocument, UserInput } from "./user.model";
import { omit } from "lodash";
import { FilterQuery } from "mongoose";

export const createUser = async (input: UserInput) => {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
};

export const validatePassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
};

export const findUser = (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).populate("todos").lean();
};
