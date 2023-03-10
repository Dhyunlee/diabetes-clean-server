import express from "express";
import User from "../models/user.js";
import Diabetes from "../models/diabetes.js";
import auth from "../middleware/auth.js";

const router = express.Router("/");

// @routes     POST api/v1/diabetes/save
// @desc       유저 Diabetes 데이터 추가
router.post("/save", async (req, res) => {
  const newDiabetes = new Diabetes(req.body);
  try {
    const savedDiabetes = await newDiabetes.save();
    res.status(200).json(savedDiabetes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// @routes     DELETE api/v1/diabetes/:id
// @desc       유저 Diabetes 데이터 삭제
router.delete("/:id", auth, async (req, res) => {
  try {
    await Diabetes.deleteOne({ _id: req.params.id });
    res.status(200).json("삭제되었습니다.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// @routes     GET api/v1/diabetes/users/:userId
// @desc       유저 Diabetes 모든 데이터 조회
router.get("/users/:userId", async (req, res) => {
  console.log(req.params);
  const writer = req.params.userId;
  try {
    const diabetes = await Diabetes.find({ writer })
      .sort({ _id: -1 }) // 내림차순 정렬
      .populate("writer", "nickname");
    res.status(200).json(diabetes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// @routes     GET api/v1/diabetes/:id
// @desc       유저 Diabetes 상세 조회
router.get("/:id", async (req, res) => {
  const diabetesId = req.params.id;
  try {
    const diabetes = await Diabetes.findById(diabetesId).populate(
      "writer",
      "nickname"
    );
    res.status(200).json(diabetes);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
