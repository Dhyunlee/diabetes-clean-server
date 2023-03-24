import { Schema, model } from "mongoose";

const contentsSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    images: {
      type: Array,
      ref: "Image",
      default: [],
    },
    empathy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Contents = model("post", contentsSchema);
export default Contents;
