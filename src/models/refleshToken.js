import { Schema, model } from "mongoose";

const refleshTokenSchema =  new Schema({
  userId: {
    type: String,
    require: true
  },
  token: {
    type: String,
    require: true,
  }
}, {
  timestamps: true,
  versionKey: false
})
const RefreshToken = model("RefreshToken", refleshTokenSchema);
export default RefreshToken;