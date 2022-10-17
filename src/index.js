import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "#config/key";
import usersRouter from "#routes/users";

const app = express();
const { mongoURI, port } = config;

app.use("/api/v1/users", usersRouter);
app.use("/", (req, res) => res.json({ isSucess: true }));

app.listen(port, () =>
  console.log(`Server Listening on http://localhost:${port}`)
);
