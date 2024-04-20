import dotenv from "dotenv";
dotenv.config()

const env = {
    port: process.env.PORT || 3000,
    mongo: process.env.DATABASE_URL,
}

export default env;