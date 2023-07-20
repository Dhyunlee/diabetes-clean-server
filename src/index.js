import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import config from "./config/key.js";
import dbconnect from "./dbconfig.js";
import {
  usersRouter,
  authRouter,
  commentRouter,
  contentsRouter,
  diabetesRouter
} from "./routes/index.js";

const app = express();
const { PORT, COOKIE_SECRET, CLIENT_URL } = config;

dbconnect();
app.use(morgan("dev"));
app.use(
  cors({
    origin: CLIENT_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/diabetes", diabetesRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/", (req, res) => res.send("연결 완료"));

app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}`)
);
