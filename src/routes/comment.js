import express from "express";
import auth from "../middleware/auth.js";
import { commentCtrl } from "../controllers/commentCtrl.js";

const router = express.Router();

// @routes     POST api/v1/comment
// @desc       Comment 데이터 추가
router.post("/", auth, commentCtrl.postComment);

// @routes     PATCH api/v1/comment/:id
// @desc       Comment 데이터 삭제
router.patch("/:id", auth, commentCtrl.updateComment);

// @routes     DELETE api/v1/comment/:id
// @desc       Comment 데이터 삭제
router.delete("/:id", auth, commentCtrl.deleteComment);

// @routes     GET api/v1/comment
// @desc       Comment 모든 데이터 조회
router.get("/", commentCtrl.getAllComment);

export default router;
