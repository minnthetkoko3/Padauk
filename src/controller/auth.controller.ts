import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";
import env from "../config/vars";
const SECRET = env.secret;
import { generateRandomString, createAuthenticationHash } from "../helper/cyptrojs.helper";
import log from "../helper/logger.helper";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password, name } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send('Missing required fields');
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).send('User already exists with this email');
        }

        // Salt and Hash Password
        const salt = generateRandomString();
        const hashedPassword = createAuthenticationHash(password, salt);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                password: hashedPassword,
            }
        });

        const token = jwt.sign({ userID: user.id }, SECRET as string);
        return res.status(201).json({ user, token });

    } catch (error) {
        log.error("Registration error:", error);
        return res.status(500).send('Error during registration');
    }
};
