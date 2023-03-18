import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/key.js";

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
    followers: { //나를 팔로우한 목록
      type: Array,
      default: [],
    },
    followings: { //내가 팔로우한 목록 
      type: Array,
      default: [],
    },
    aboutMe: { //유저 소개
      type: String,
      max: 80,
    },
  },
  {
    timestamps: true,
  }
);

// 비번 검사
userSchema.methods.checkPassword = function (originPw, cb) {
  bcrypt.compare(originPw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰 발급
userSchema.methods.generateToken = function () {
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
userSchema.statics.verifyToken = function (token, cb) {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return cb(err);
    cb(null, decoded);
  });
};

const User = model("User", userSchema);
export default User;
