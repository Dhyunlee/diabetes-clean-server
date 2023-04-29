import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contentsId: {
      type: Schema.Types.ObjectId,
      ref: "Contents",
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comments'
    },
    content: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false, /* true이면 삭제된 상태 */
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export default Comment;
