import express from "express";
import auth from "../middleware/auth.js";
import { userCtrl } from "../controllers/userCtrl.js";
import { INDEX_PATH } from "../constants/path.js";

const router = express.Router();

// @routes     GET api/v1/users
// @desc       유저 정보
router.get(INDEX_PATH, auth, userCtrl.getUserInfo);

// @routes     POST api/v1/users
// @desc       유저 회원가입
router.post(INDEX_PATH, userCtrl.postUser);

export default router;
