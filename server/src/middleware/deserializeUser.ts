import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../modules/session/session.service";
import { verifyJwt } from "../utils/jwt";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get the access and refresh tokens
    const accessToken = get(req, "cookies.accessToken");

    const refreshToken = get(req, "cookies.refreshToken");

    const { decoded } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken === false) return next();

        if (newAccessToken) {
            res.cookie("accessToken", newAccessToken, {
                maxAge: 900000, // 15 min
                httpOnly: true,
                domain: "localhost",
                path: "/",
                sameSite: "strict",
                secure: false,
            });
        }

        const result = verifyJwt(newAccessToken);
        res.locals.user = result.decoded;
        return next();
    }

    return next();
};

export default deserializeUser;
