import express from "express";
import authRouter from "./auth.router";

const router = express.Router();

router.use('/v1', authRouter);

export default router;