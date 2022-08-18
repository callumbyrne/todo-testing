import express from "express";
import logger from "./utils/logger";

import deserializeUser from "./middleware/deserializeUser";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./modules/user/user.route";
import sessionRouter from "./modules/session/session.route";

const app = express();

app.use(
    cors({
        origin: config.get("origin"),
    })
);
app.use(express.json());
app.use(deserializeUser);
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

// Health check
app.get("/ping", (_req, res) => res.status(200).json({ message: "pong" }));

// Error handling
app.use((_req, res) => {
    const error = new Error("Not found");
    logger.error(error);

    return res.status(404).json({ message: error.message });
});

export default app;
