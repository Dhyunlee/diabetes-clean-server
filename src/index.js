import express, { application } from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from "./config/key.js";
import dbconnect from "./dbconfig.js";
import usersRouter from "./routes/users.js";
import authRouter from './routes/auth.js';

const app = express();
const { PORT, COOKIE_SECRET } = config;

dbconnect()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/", (req, res) => res.json({ isSucess: true }));

app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}`)
);
