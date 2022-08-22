import { Request, Response } from "express";
import logger from "../../utils/logger";
import { createUser } from "./user.service";

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
};
