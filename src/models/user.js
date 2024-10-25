import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      maxlength: 66,
      require: true
    },
    nickname: {
      type: String,
      maxlength: 13
    },
    password: {
      type: String,
      minglength: 5,
      require: false, //sns 로그인인 경우 필요 없음
      default: ""
    },
    snsId: {
      type: String,
      require: true
    },
    provider: {
      type: String,
      enum: ['local', 'kakao', 'google', 'naver'],
      default: 'local',
      require: true
    },
    imageData: {
      type: Object,
      default: {}
    },
    aboutMe: {
      //유저 소개
      type: String,
      max: 80
    },
    followers: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    followings: [
      {
        type: ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = model("User", userSchema);
export default User;
