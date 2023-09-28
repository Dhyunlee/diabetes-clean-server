import express from "express";
import { searchCtrl } from "../controllers/searchCtrl.js";

const router = express.Router();

// @routes     GET api/v1/search?keyword=value&page=1&size=10
// @desc       Contents 검색
router.get("/", searchCtrl.getSearchContents);

export default router;
