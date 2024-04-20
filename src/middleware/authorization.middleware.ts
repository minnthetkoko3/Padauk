import { Request, Response, NextFunction } from "express";
import jwt,{ JwtPayload} from "jsonwebtoken";
import env from "../config/vars";
import log from "../helper/logger.helper";
import prisma from "../prisma/prisma";

interface MyJwtPayload extends JwtPayload {
    _id: string
}

const authoriationMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const message = "authriation middleware"
    try {
        // get token form request header
        const token = req.headers["x-token"] as string | undefined;
        if (!token) {
            log.error(message, 'Token is required.', 'Add token in request headers')
            return res.sendStatus(400).json({
                success: false,
                message: 'Token is required',
                solution: 'Add token in request headers'    
            })
        }

        // Verify and decode the token
        const decode = jwt.verify(token, env.secret as string) as MyJwtPayload
        if (!decode) {
            log.error(message, 'Token is invalid.', 'Try again with the correct token.' )
            return res.sendStatus(400).json({
                sucess: false,
                message: "Token is invalid",
                solution: "Try again with the correct token."
            })
        }

        // Use the _id from the decoded token to find the user
        const user = await prisma.user.findUnique({
            where: { id: decode._id } ,
            select: {
              id: true,
              email: true,
              username: true,
              name: true,
              createdAt: true,
              posts: true,
              // Exclude the password field
              password: false
            }
          });
          
          if (!user) {
            log.error(message, 'User not found.', 'Check the token payload for the correct user ID.');
            return res.sendStatus(400).json({
                success: false,
                message: "User not found",
                solution: "Check the token payload for the correct user ID"
            })

          }
          


    } catch (error) {
        log.error(message, "Contact the admin with error detail")
        return res.sendStatus(500).json({
            success: false,
            message: "contact the admin with error deatail"
        })
    }
}