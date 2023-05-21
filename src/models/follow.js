import { Schema, model } from "mongoose";

const followSchema = Schema(
  {
    followers: {
      //나를 팔로우한 목록
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followings: {
      //내가 팔로우한 목록
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Follow = model("Follow", followSchema);
export default Follow;
