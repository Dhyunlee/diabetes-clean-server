import express from "express";
import { authCtrl } from "../controllers/authCtrl.js";
import { CHECK_EMAIL, LOG_IN, LOG_OUT } from "../constants/path.js";

const router = express.Router();

// @routes     POST api/v1/auth/login
// @desc       로그인
router.post(LOG_IN, authCtrl.login);

// @routes     POST api/v1/auth/checkemail
// @desc       이메일 중복 확인
router.post(CHECK_EMAIL, authCtrl.checkemail);

// @routes     GET api/v1/auth/logout
// @desc       로그아웃
router.get(LOG_OUT, authCtrl.logout);
export default router;
