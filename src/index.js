import express from "express";
import cookieParser from 'cookie-parser';

import config from "./config/key.js";
import usersRouter from "./routes/users.js";
import dbconnect from "./dbconfig.js";

const app = express();
const { PORT, COOKIE_SECRET } = config;

dbconnect()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("/api/v1/users", usersRouter);
app.use("/", (req, res) => res.json({ isSucess: true }));

app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}`)
);
