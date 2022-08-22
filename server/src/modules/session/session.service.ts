import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from "../../utils/jwt";
import { findUser } from "../user/user.service";
import SessionModel, { SessionDocument } from "./session.model";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    return SessionModel.find(query).lean();
};

export const findSession = async (query: FilterQuery<SessionDocument>) => {
    return SessionModel.findOne(query).lean();
};

export const updateSession = async (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) => {
    return SessionModel.updateOne(query, update);
};

export const reIssueAccessToken = async ({
    refreshToken,
}: {
    refreshToken: string;
}) => {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 min
    );

    return accessToken;
};
