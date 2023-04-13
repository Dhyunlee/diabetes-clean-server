import express from "express";
import auth from "../middleware/auth.js";
import { diabetesCtrl } from "../controllers/diabetesCtrl.js";

const router = express.Router("/");

// @routes     POST api/v1/diabetes
// @desc       Diabetes 데이터 추가
router.post("/", auth, diabetesCtrl.postDiabetes);

// @routes     PATCH api/v1/diabetes/:id
// @desc       Diabetes 데이터 수정
router.patch("/:id", auth, diabetesCtrl.updateDiabetes);

// @routes     DELETE api/v1/diabetes/:id
// @desc       Diabetes 데이터 삭제
router.delete("/:id", auth, diabetesCtrl.deleteDiabetes);


// @routes     GET api/v1/diabetes/users/:userId
// @desc       Diabetes 모든 데이터 조회
router.get("/users/:userId", auth, diabetesCtrl.getAllDiabetes);

// @routes     GET api/v1/diabetes/:id
// @desc       Diabetes 상세 조회
router.get("/:id", auth, diabetesCtrl.getFindById);

export default router;
