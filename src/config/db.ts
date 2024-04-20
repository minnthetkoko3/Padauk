import { PrismaClient } from "@prisma/client";
import config from "./vars";
import log from "../helper/logger.helper";

const prisma = new PrismaClient();

// connect to db
const connectToDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect();
        log.info(`Database connected successfully to ${config.mongo}`);
    } catch (error) {
        log.error(`Database connection failed`);
        throw error;
    }
};

const db = async (): Promise<void> => {
    try {
        await connectToDatabase();
    } catch (error) {
        log.error(`Failed to connect to the database`);
    } finally {
        await prisma.$disconnect();
        log.info('Database connection closed');
    }
};

export default db;
