import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "#config/key";

const { JWT_SECRET } = config;

const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      maxlength: 50,
      require: true,
    },
    nickname: {
      type: String,
      maxlength: 50,
    },
    password: {
      type: String,
      minglength: 5,
      require: true,
    },
    imageSrc: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 비번 검사
userSchema.methods.checkPassword = (originPw, cb) => {
  bcrypt.compare(originPw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰 발급
userSchema.methods.generateToken = () => {
  const token = jwt.sign(
    {
      _id: this.id,
      nickname: this.nickname,
    },
    JWT_SECRET,
    { expiresIn: "7d", issuer: "donghu" }
  );
  return token;
};

// 토큰 검증
userSchema.statics.verifyToken = (token, cb) => {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return cb(err);
    cb(null, decoded);
  });
};

const User = model("User", userSchema);
export default User;
