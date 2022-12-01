import express from "express";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

// @routes     GET api/users
// @desc       유저 인증 상태
router.get("/", auth, async (req, res) => {
  try {
    const data = req.user;
    if (!data) return res.status(401).json('인증 필요');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @routes     POST api/users
// @desc       유저 회원가입
router.post("/", async (req, res) => {
  const { email, nickname, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      nickname,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 토큰 생성
    const token = user.generateToken();

    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일, (1000 * 60 * 60 * 24) = 1일
        httpOnly: true,
      })
      .status(200)
      .json({ msg: "가입 완료" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
