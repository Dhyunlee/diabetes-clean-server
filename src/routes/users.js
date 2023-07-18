import express from "express";
import auth from "../middleware/auth.js";
import { userCtrl } from "../controllers/userCtrl.js";
import { INDEX_PATH } from "../constants/path.js";

const router = express.Router();

// @routes     GET api/v1/users
// @desc       유저 정보
router.get(INDEX_PATH, auth, userCtrl.getUserInfo);

// @routes     GET api/v1/users/all-users
// @desc       모든유저 정보
router.get("/all-users", userCtrl.getUsersInfo);

// @routes     POST api/v1/users
// @desc       유저 회원가입
router.post(INDEX_PATH, userCtrl.postUser);

// @routes     patch api/v1/users/:id/follow
// @desc       유저 팔로우
router.patch("/:id/follow", auth, userCtrl.addFollow);

// @routes     patch api/v1/users/:id/unfollow
// @desc       유저 언팔로우
router.delete("/:id/unfollow", auth, userCtrl.unFollow);
export default router;
