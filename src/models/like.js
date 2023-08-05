import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const LikeSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User"
  },
  contentsType: {
    type: String
  },
  contentsId: {
    type: ObjectId,
    ref: "Contents"
  },
  commentId: {
    type: ObjectId,
    ref: "Comment"
  }
});

export const Like = model("Like", LikeSchema);
