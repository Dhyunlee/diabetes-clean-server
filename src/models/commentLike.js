import { Schema, model } from "mongoose";

const commentLikeSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const CommentLike = model("CommentLike", commentLikeSchema);
export default CommentLike;
