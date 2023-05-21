import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_CONFIG from "../config/dev.js";

const { secret, algorithm, shortExpiresIn, longExpiresIn } =
  JWT_CONFIG.JWT_CONFIG;

const JWT_AUTH = {
  matchPassword: async (userPassword, savedPassword) => {
    return await bcrypt.compare(userPassword, savedPassword);
  },
  generateToken: (payLoad) => {
    return jwt.sign(payLoad, secret, {
      algorithm,
      expiresIn: shortExpiresIn,
    });
  },
  generateRefleshToken: () => {
    return jwt.sign({}, secret, {
      algorithm,
      expiresIn: longExpiresIn,
    });
  },
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, secret);
      return { isDecode: true, decoded };
    } catch (error) {
      if (error.message === "jwt expired") {
        return { isDecode: false, message: error.message };
      } else {
        return { isDecode: false, message: "invalid Token" };
      }
    }
  },
  verifyRefleshToken: async (token, savedToken) => {
    if (token !== savedToken) {
      return { isDecode: false, message: "invalid Token" };
    } else {
      try {
        const decoded = jwt.verify(token, secret);
        return { isDecode: true, decoded };
      } catch (error) {
        if (error.message === "jwt expired") {
          return { isDecode: false, message: error.message };
        } else {
          return { isDecode: false, message: "invalid Token" };
        }
      }
    }
  },
};

export default JWT_AUTH;
