import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const empathySchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User"
  },
  contentsId: {
    type: ObjectId,
    ref: "Contents"
  }
});

export const Empathy = model("Empathy", empathySchema);
