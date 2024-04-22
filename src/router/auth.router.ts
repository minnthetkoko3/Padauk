import express,{ Express, Request, Response } from "express";
import { register } from "../controllers/auth.controller";
import requestLimitMiddleware from "../middleware/req-limit.middleware";
const authRouter = express.Router();

// @route     POST api/v1/register
// @desc      Register
// @acess     Public
authRouter.post('/register',requestLimitMiddleware, register)

// @route     POST api/v1/register
// @desc      Register
// @acess     Public
authRouter
export default authRouter;