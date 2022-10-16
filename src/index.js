import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from '../config/key.js';

const app = express();
const {mongoURI, port} = config;


app.get('/', (req, res) => res.json({isSucess: true}))

app.listen(port, () => console.log(`Server Listening on ${port}`));
