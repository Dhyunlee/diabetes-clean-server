import express from "express";
import auth from "../middleware/auth.js";
import { diabetesCtrl } from "../controllers/diabetesCtrl.js";

const router = express.Router("/");

// @routes     POST api/v1/diabetes/save
// @desc       유저 Diabetes 데이터 추가
router.post("/save", diabetesCtrl.postDiabetes);

// @routes     DELETE api/v1/diabetes/:id
// @desc       유저 Diabetes 데이터 삭제
router.delete("/:id", auth, diabetesCtrl.deleteDiabetes);

// @routes     GET api/v1/diabetes/users/:userId
// @desc       유저 Diabetes 모든 데이터 조회
router.get("/users/:userId", diabetesCtrl.getAllDiabetes);

// @routes     GET api/v1/diabetes/:id
// @desc       유저 Diabetes 상세 조회
router.get("/:id", diabetesCtrl.getFindById);

export default router;
