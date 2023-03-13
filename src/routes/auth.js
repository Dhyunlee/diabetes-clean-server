import express from "express";
import { authCtrl } from "../controllers/authCtrl.js";

const router = express.Router();

// @routes     POST api/v1/auth/login
// @desc       유저 로그인
router.post("/login", authCtrl.login);

// @routes     POST api/v1/auth/checkemail
// @desc       이메일 중복 확인
router.post('/checkemail', authCtrl.checkemail);

// @routes     GET api/v1/auth/logout
// @desc       유저 로그아웃
router.get('/logout', authCtrl.logout);

export default router;
