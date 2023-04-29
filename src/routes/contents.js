import express from "express";
import auth from "../middleware/auth.js";
import { contentsCtrl } from "../controllers/contentsCtrl.js";

const router = express.Router();

// @routes     POST api/v1/contents
// @desc       Contents 데이터 추가
router.post("/", auth, contentsCtrl.postContents);

// @routes     PATCH api/v1/contents/:id
// @desc       Contents 데이터 삭제
router.patch("/:id", auth, contentsCtrl.updateContents);

// @routes     DELETE api/v1/contents/:id
// @desc       Contents 데이터 삭제
router.delete("/:id", auth, contentsCtrl.deleteContents);

// @routes     GET api/v1/contents
// @desc       Contents 모든 데이터 조회
router.get("/", contentsCtrl.getAllContents);

// @routes     GET api/v1/contents/users/:id
// @desc       유저의 Contents 모든 데이터 조회
router.get("/users/:id", contentsCtrl.getAllUserContents);

// @routes     GET api/v1/contents/:id
// @desc       Contents 상세 조회
router.get("/:id", contentsCtrl.getFindById);

export default router;
