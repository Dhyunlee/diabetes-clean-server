import express from "express";
import auth from "../middleware/auth.js";
import { userCtrl } from "../controllers/userCtrl.js";

const router = express.Router();

// @routes     GET api/v1/users
// @desc       유저 인증 상태
router.get("/", auth, userCtrl.getUserState);

// @routes     POST api/v1/users
// @desc       유저 회원가입
router.post("/", userCtrl.postUser);

export default router;
