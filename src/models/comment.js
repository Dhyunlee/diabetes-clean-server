import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ContentsId: {
      type: Schema.Types.ObjectId,
      ref: "Contents",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export default Comment;
