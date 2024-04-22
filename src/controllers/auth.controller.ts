import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";
import env from "../config/vars";
import { generateRandomString, createAuthenticationHash } from "../helper/cyptrojs.helper";
import log from "../helper/logger.helper";
import { getUserByEmail } from "../prisma/userUtils";

const SECRET = env.secret;


export const register = async (req: Request, res: Response) => {
    try {
        // Request from body
        const { email, username, password, name } = req.body;
        if (!email || !username || !password) {
            return res.status(400).send('Missing required fields');
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(409).json({
                success: false,
                message: 'User already exists with this email',
                solution: "Try with other email"
            })
        };

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
        return res.status(201).json({
            success: true,
            message: "Thank for create account",
            user, token });

    } catch (error) {
        log.error("Registration error:", error);
        return res.status(500).json({
            success: false,
                message: "Can't Create New User",
                solution: "Chack the Infomation or Error detail ant contant to admin"
        })
    }
};

