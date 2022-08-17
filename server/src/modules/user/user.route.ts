import express from "express";
import { createUserHandler } from "./user.controller";
import validateResource from "../../middleware/validateResource";
import { createUserSchema } from "./user.schema";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

export = router;
