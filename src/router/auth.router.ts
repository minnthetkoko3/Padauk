import express,{ Express, Request, Response } from "express";
import { register } from "../controller/auth.controller";
const authRouter = express.Router();

authRouter.post('/register', register)

export default authRouter;