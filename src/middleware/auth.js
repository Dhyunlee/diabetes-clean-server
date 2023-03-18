import day from "dayjs";
import User from "../models/user.js";

let auth = async (req, res, next) => {
  let token =
  req.headers.hasOwnProperty("authorization") && req.headers.authorization.split("Bearer ")[1];
  if (token === 'undefined') {
    // 토큰 없음
    return res.status(401).json({ isOk: false, msg: "인증이 필요합니다." });
  } 

  // 토큰 검증
  User.verifyToken(token, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ isOk: false, msg: "토큰이 유효하지 않습니다." });
    }
    const user = await User.findById(decoded._id);
    // const now = Math.floor(day().valueOf() / 1000);
    // if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
    //   console.log("토큰 발급");
    //   const token = user.generateToken();
    //   res.cookie("access_token", token, {
    //     maxAge: 1000 * 60 * 60 * 24 * 7,
    //     httpOnly: true,
    //   });
    // }
    const { password, ...userData } = user._doc;
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
