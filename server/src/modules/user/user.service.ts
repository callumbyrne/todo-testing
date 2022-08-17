import UserModel, { UserInput } from "./user.model";
import { omit } from "lodash";

export const createUser = async (input: UserInput) => {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
};
