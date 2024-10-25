import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/dev.js";
import RefreshToken from "../models/refleshToken.js";

const { JWT_SECRET, JWT_ALGORITHN, JWT_SHORT_EXPIRESIN, JWT_LONG_EXPIRESIN } =
  config;

const JWT_AUTH = {
  matchPassword: async (userPassword, savedPassword) => {
    return await bcrypt.compare(userPassword, savedPassword);
  },
  generateToken: (payLoad) => {
    return jwt.sign(payLoad, JWT_SECRET, {
      algorithm: JWT_ALGORITHN,
      expiresIn: JWT_SHORT_EXPIRESIN
    });
  },
  generateRefleshToken: () => {
    return jwt.sign({}, JWT_SECRET, {
      algorithm: JWT_ALGORITHN,
      expiresIn: JWT_LONG_EXPIRESIN
    });
  },
  verifyToken: async (token) => {
    try {
      console.log('verifyToken', token)
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log({decoded: decoded})
      return { isDecode: true, decoded };
    } catch (error) {
      console.log(error);
      return { isDecode: false };
    }
  },
  verifyRefleshToken: async (token) => {
    console.log("토큰 검증");
    const savedToken = await RefreshToken.findOne({ token });
    if (!savedToken) {
      return null;
    } else {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { isDecode: true, decoded, userId: savedToken.userId };
      } catch (error) {
        await savedToken.deleteOne()
        return { isDecode: false };
      }
    }
  }
};

export default JWT_AUTH;
