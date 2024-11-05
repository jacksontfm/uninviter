import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());

//server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});

//default path
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("This is the Uninviter server");
});