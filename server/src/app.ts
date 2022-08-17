import express from "express";
import logger from "./utils/logger";

import userRouter from "./modules/user/user.route";
import sessionRouter from "./modules/session/session.route";

const app = express();

app.use(express.json());

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
