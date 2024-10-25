import User from "../models/user.js";
import JWT_AUTH from "../utils/jwt_auth.js";

// let loading = 0;
const auth = async (req, res, next) => {
  console.log("auth middleware");
  const accessToken =
    req.headers.hasOwnProperty("authorization") &&
    req.headers.authorization.split("Bearer ")[1];
  console.log({ accessToken });
  try {
    const isVerifyToken = await JWT_AUTH.verifyToken(accessToken);
    console.log({ isVerifyToken });
    if (isVerifyToken.isDecode) {
      const user = await User.findOne({ email: isVerifyToken.decoded.email });
      const { password, token, ...userData } = user._doc;
      req.user = userData;
      next();
    } else {
      // accessToken이 만료되었다면, jwt expired 에러
      // accessToken이 존재하지않다면, invalid Token 에러
      // console.log("accessToken 만료", { isVerifyToken });
      return res
        .status(401)
        .json({ isOk: false, msg: "토큰이 만료되었습니다." });
    }
  } catch (error) {
    console.log("500", { error });
    return res.status(500).json(error);
  }
};

export default auth;
