import { Schema, model } from "mongoose";

const contentsEmpathySchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const ContentsEmpathy = model("ContentsEmpathy", contentsEmpathySchema);
export default ContentsEmpathy;
