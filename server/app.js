import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config({path: '../.env'});

const app = express();

app.use(express.json());
app.use(cors());

export default app;