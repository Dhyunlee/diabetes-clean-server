import User from "../models/user.js";
import bcrypt from "bcrypt";

export const userCtrl = {
  postUser: async (req, res) => {
    const { email, nickname, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        nickname,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(200).json({ isOk: true, msg: "가입 완료" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async () => {},
  deleteUser: async () => {},
  getUserInfo: async (req, res) => {
    try {
      res.status(200).json({ isOk: true, userInfo: req.user });
    } catch (err) {
      res.status(500).json({ err });
    }
  },
};
