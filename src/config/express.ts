import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import log from "../helper/logger.helper";
import router from "../router/routes";

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("server is running");
    log.info("server is running")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({credentials: true}))
app.use(compression())
app.use(bodyParser.json())

// http:localhost:3000/api/v1
app.use("/api/v1", router)

export default app;