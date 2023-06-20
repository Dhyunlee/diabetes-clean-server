import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const commentLikeSchema = Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    commentId: {
      type: ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const CommentLike = model("CommentLike", commentLikeSchema);
export default CommentLike;
