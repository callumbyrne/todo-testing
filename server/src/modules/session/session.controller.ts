import config from "config";
import { Request, Response } from "express";
import { signJwt } from "../../utils/jwt";
import { validatePassword } from "../user/user.service";
import { createSession } from "./session.service";

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // Validate users password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    // Create access and refresh tokens
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 min
    );

    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshTokenTtl") } // 1 year
    );
    // Add tokens to cookies
    res.cookie("accessToken", accessToken, {
        maxAge: 900000, // 15 min
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });
    // Return access and refresh tokens
    return res.status(201).send({ accessToken, refreshToken });
};
