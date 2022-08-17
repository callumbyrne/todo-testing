import express from "express";
import { createUserSessionHandler } from "./session.controller";

const router = express.Router();

router.post("/", createUserSessionHandler);

export = router;
