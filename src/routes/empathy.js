import express from "express";
import { empathyCtrl } from "../controllers/empathyCtrl";
const router = express.Router();

// @routes     POST api/v1/empathy/contents/:id
// @desc       empathy 추가
router.post("/", auth, empathyCtrl.empathy);

// @routes     POST api/v1/empathy/contents/:id
// @desc       empathy 취소
router.delete("/", auth, empathyCtrl.unEmpathy);

// @routes     POST api/v1/empathy/contents/:id
// @desc       empathy 데이터 조회
router.get("/", auth, empathyCtrl.getEmpathy);

export default router;
