import express from "express";
import { authCtrl } from "../controllers/authCtrl.js";
import { CHECK_EMAIL, INDEX_PATH, LOG_IN, LOG_OUT } from "../constants/path.js";
import auth from "../middleware/auth.js";
import getKakaoUser from "../middleware/getKakaoUser.js";
import getGoogleUser from "../middleware/getGoogleUser.js";
import getNaverUser from "../middleware/getNaverUser.js";

const router = express.Router();

// @routes     POST api/v1/auth/login
// @desc       로그인
router.post(LOG_IN, authCtrl.login);

// @routes     POST api/v1/auth/google
// @desc       구글 인증(사용자 정보)
router.get("/google", getGoogleUser, authCtrl.googleLogin);

// @routes     POST api/v1/auth/kakao
// @desc       카카오 인증(사용자 정보)
router.get("/kakao", getKakaoUser, authCtrl.kakaoLogin);

// @routes     POST api/v1/auth/naver
// @desc       네이버 인증(사용자 정보)
router.get("/naver", getNaverUser, authCtrl.naverLogin);

// @routes     POST api/v1/auth/checkemail
// @desc       이메일 중복 확인
router.post(CHECK_EMAIL, authCtrl.checkemail);

// @routes     GET api/v1/auth/logout
// @desc       로그아웃
router.get(`${LOG_OUT}/:userId`, authCtrl.logout);

// @routes     GET api/v1/auth
// @desc       토큰이 유효하다면, 유저 정보를 클라이언트로 전달
router.get(INDEX_PATH, auth, authCtrl.getUserIdByToken);

// @routes     GET api/v1/auth/reflesh
// @desc       토큰이 만료되면 reflesh api 요청해 재발급
router.get("/reflesh", authCtrl.reflesh);

// @routes     GET api/v1/auth/verifyemail
// @desc       이메일 인증
router.post("/verifyemail", authCtrl.verifyEmail);

export default router;
