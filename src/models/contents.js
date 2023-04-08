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
  },
  {
    timestamps: true,
  }
);

const Contents = model("Contents", contentsSchema);
export default Contents;