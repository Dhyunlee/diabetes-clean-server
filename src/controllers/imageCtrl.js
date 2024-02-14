import { v2 as cloudinary } from "cloudinary";
// import PostImg from "../models/postImg";
// import ProfileImg from "../models/profileImg";

const options = {
  cloud_name: "djkco04ow",
  api_key: "975349655584691",
  api_secret: "0gikK2oIfXefwgTujLXdL73BBEQ"
};

cloudinary.config(options);

export const imageCtrl = {
  deleteUploadedImg: async (req, res) => {
    try {
      const data = await cloudinary.uploader.destroy(
        req.body.publicId,
        (result) => {
          console.log(result);
          return result;
        }
      );
      if (data.result === "not found") {
        return res.status(404).json({ isOk: false, msg: data.result });
      }
      res.json({ isOk: true, msg: data.result });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  // uploadImg: async (req, res) => {
  //   cloudinary.uploader.upload(req.file, (error, result) => {
  //     if (error) {
  //       console.error("Error uploading image to Cloudinary:", error);
  //       res.status(500).send("Cloudinary에 이미지 업로드하는데 실패했습니다.");
  //     } else {
  //       // Cloudinary에서 반환된 이미지 URL을 클라이언트에게 전송
  //       console.log({ result });
  //       res.json({ imageUrl: result.secure_url });
  //     }
  //   });
  // },
  // uploadPostImg: async (req, res) => {
  //   const postImg = new PostImg(req.body);
  //   try {
  //     await postImg.save();
  //     res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json(err);
  //   }
  // },
  // uploadProfileImg: async (req, res) => {
  //   const profileImg = new ProfileImg(req.body);
  //   try {
  //     const savedImageUrl = await profileImg.save();
  //     res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json(err);
  //   }
  // }
};
