import express from "express";
import logger from "./utils/logger";

const app = express();

app.use(express.json());

// Routes

// Health check
app.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));

// Error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    logger.error(error);

    return res.status(404).json({ message: error.message });
});

export default app;
