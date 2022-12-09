import day from "dayjs";
import User from "../models/user.js";

let auth = async (req, res, next) => {
  let token = req.cookies.access_token;
  if (!token) return next(); // 토큰 없음

  // 토큰 검증
  User.verifyToken(token, async (err, decoded) => {
    if (err) throw err;
    const user = await User.findById(decoded._id);
    const now = Math.floor(day().valueOf() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      console.log("토큰 발급");
      const token = user.generateToken();
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    const {password, ...userData} = user._doc;
    req.user = userData;
    next();
    /* 
       다음 미들웨어 데이터를 전달할 때 
       req.속성 = 값 형태로 전달할 수 있다.  
       ex) req.user = user //유저 데이터 전달
    */
  });
};

export default auth;
