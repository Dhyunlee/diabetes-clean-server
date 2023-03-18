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
    createdAt: {
      type: String,
      default: new Date(),
      require: true,
    },
  },
  {
    timestamps: false,
  }
);

const Diabetes = model("Diabetes", diabetesSchema);
export default Diabetes;
