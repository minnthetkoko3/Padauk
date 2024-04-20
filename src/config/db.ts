// import { PrismaClient } from "@prisma/client";
// import config from "./vars"
// const prisma = new PrismaClient();

// const db = async () => {
//     await prisma.$connect()
//     console.log(`Database connect successfully ${config.mongo}`)

// }

// db().catch((error) => {
//     console.log(error)
// }).finally(async () => {
//     await prisma.$disconnect
// })

// export default db;

import { PrismaClient } from "@prisma/client";
import config from "./vars";
import { Logger } from "tslog"; // Import the tslog logger

const prisma = new PrismaClient();
const log = new Logger();

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
