import User from "../models/user.js";
import JWT_AUTH from "../utils/jwt_auth.js";

export const authCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ isOk: false, msg: "유저가 존재하지 않습니다." });
      }

      // password 체크
      const isMathchPw = await JWT_AUTH.matchPassword(password, user.password);
      if (!isMathchPw) {
        res.status(401).json({
          isOk: false,
          msg: "비밀번호가 일치하지 않습니다.",
        });
      } else {
        console.log(isMathchPw, "로그인성공");
        // TODO: Create a token for the user
        const accessToken = JWT_AUTH.generateToken({ email: user.email });
        res
          .status(200)
          .json({ isOk: true, accessToken });
      }
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
        return res
          .status(409)
          .json({ isOk: false, msg: "이미 존재하는 이메일입니다." });
      } else {
        return res
          .status(200)
          .json({ isOk: true, msg: "사용 가능한 이메일입니다." });
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
