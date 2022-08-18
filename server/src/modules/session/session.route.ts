import express from "express";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResource";
import {
    createUserSessionHandler,
    deleteUserSessionHandler,
    getUserSessionHandler,
} from "./session.controller";
import { createSessionSchema } from "./session.schema";

const router = express.Router();

router.post(
    "/",
    validateResource(createSessionSchema),
    createUserSessionHandler
);

router.get("/", requireUser, getUserSessionHandler);

router.delete("/", requireUser, deleteUserSessionHandler);

export = router;
