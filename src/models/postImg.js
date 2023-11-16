import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const postImg = new Schema({
  writer: {
    type: ObjectId,
    ref: "Contents"
  },
  imageName: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

const PostImg = model("Image", postImg);
export default PostImg;
