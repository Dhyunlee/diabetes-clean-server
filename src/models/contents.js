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
    imageName: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

const Contents = model("Contents", contentsSchema);
export default Contents;
