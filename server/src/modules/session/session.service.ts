import SessionModel from "./session.model";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
};
