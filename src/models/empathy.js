import { Schema, model } from "mongoose";

const empathySchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    contentsId: {
      type: Schema.Types.ObjectId,
      ref: "Contents",
    },
  },
  {
    timestamps: true,
  }
);

const empathy = model("Empathy", empathySchema);
export default empathy;
