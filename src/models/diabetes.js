import { Schema, model } from "mongoose";

const diabetesSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    GI: {
      type: Number,
      require: true,
    },
    slot: {
      type: String,
      require: true,
    },
    createdTime: {
      type: String,
      default: Date.now,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diabetes = model("Diabetes", diabetesSchema);
export default Diabetes;
