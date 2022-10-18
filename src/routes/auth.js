import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

// @routes     POST api/auth/login
// @desc       유저 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("유저가 존재하지 않습니다.");
    }

    // password 체크
    user.checkPassword(password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json("비밀번호가 일치하지 않습니다.");
      } else {
        const { password, ...userData } = user?._doc;

        // 토큰 생성하기
        const token = user.generateToken();

        res
          .cookie("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일, (1000 * 60 * 60 * 24) = 1일
            httpOnly: true,
          })
          .status(200)
          .json({ userData, msg: "로그인 완료" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
