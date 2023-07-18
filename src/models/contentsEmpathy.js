import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const contentsEmpathySchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User"
    },
    contentsId: {
      type: ObjectId,
      ref: "Contents"
    }
  },
  {
    timestamps: true
  }
);

const ContentsEmpathy = model("ContentsEmpathy", contentsEmpathySchema);
export default ContentsEmpathy;
