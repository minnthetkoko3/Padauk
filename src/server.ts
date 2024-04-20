import app from './config/express';
import env from "./config/vars";
import db from './config/db';

// connect db
db();

// server listening
app.listen(env.port, () => {
    console.log(`server running on PORT:${env.port} || http://localhost:3000/`)
});
