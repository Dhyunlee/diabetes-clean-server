import User from "../models/user.js";

export const authCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ isOk: false, msg: "유저가 존재하지 않습니다." });
      }

      // password 체크
      user.checkPassword(password, (err, isMatch) => {
        if (!isMatch) {
          res.status(401).json({ isOk: false, msg: "비밀번호가 일치하지 않습니다." });
        } else {
          // 토큰 생성하기
          const token = user.generateToken();
          res.status(200).json({ isOk: true, token });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  checkemail: async (req, res) => {
    const { email } = req.body;
    // 가입된 유저인지 확인
    try {
      const isUser = await User.findOne({ email });
      if (isUser) {
        return res.status(409).json({ isOk: false, msg: "이미 존재하는 이메일입니다." });
      } else {
        return res.status(200).json({ isOk: true, msg: "사용 가능한 이메일입니다." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  logout: async (req, res) => {
    res
      .status(200)
      .clearCookie("token")
      .json({ isOk: true, msg: "성공적으로 로그아웃되었습니다." });
  },
};