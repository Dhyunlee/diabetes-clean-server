import { Schema, model } from "mongoose";

const imageSchema = Schema({
    imageName: {
        type: String,
    },
    imageUrl: {
        type: String,
    },

})

const Image = model("Image", imageSchema);
export default Image;