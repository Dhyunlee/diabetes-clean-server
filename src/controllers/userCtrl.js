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
        password: hashedPassword
      });

      await newUser.save();
      res.status(200).json({ isOk: true, msg: "가입 완료" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUser: async () => {},
  deleteUser: async () => {},
  addFollow: async (req, res) => {
    const reqUser = req.params.id;
    const reqCurrentUser = req.body.userId;
    try {
      if (reqUser !== reqCurrentUser) {
        const user = await User.findById(reqUser);
        const currentUser = await User.findById(reqCurrentUser);

        if (!user.followers.includes(reqCurrentUser)) {
          await user.updateOne({ $push: { followers: reqCurrentUser } });
          await currentUser.updateOne({ $push: { followings: reqUser } });
          res
            .status(200)
            .json({ isOk: true, msg: "성공적으로 팔로우했습니다." });
        } else {
          res
            .status(403)
            .json({ isOk: false, msg: "이미 팔로우한 유저입니다." });
        }
      } else {
        res
          .status(403)
          .json({ isOk: false, msg: "자신을 팔로우할 수는 없습니다." });
      }
    } catch (err) {
      console.err(err);
      res.status(500).json(err);
    }
  },
  unFollow: async (req, res) => {
    const reqUser = req.params.id;
    const reqCurrentUser = req.body.userId;
    try {
      if (reqUser !== reqCurrentUser) {
        const user = await User.findById(reqUser);
        const currentUser = await User.findById(reqCurrentUser);

        if (user.followers.includes(reqCurrentUser)) {
          await user.updateOne({ $pull: { followers: reqCurrentUser } });
          await currentUser.updateOne({ $pull: { followings: reqUser } });
          res
            .status(200)
            .json({ isOk: true, msg: "성공적으로 언팔로우 되었습니다." });
        } else {
          res
            .status(403)
            .json({ isOk: false, msg: "팔로우한 대상이 아닙니다." });
        }
      } else {
        res
          .status(403)
          .json({ isOk: false, msg: "자신을 언팔로우할 수는 없습니다." });
      }
    } catch (err) {
      console.err(err);
      res.status(500).json(err);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      res.status(200).json({ isOk: true, userInfo: req.user });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
};
