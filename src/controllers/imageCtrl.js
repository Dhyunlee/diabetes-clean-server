import PostImg from "../models/postImg";
import ProfileImg from "../models/profileImg.JS";

export const imageCtrl = {
  uploadPostImg: async (req, res) => {
    const postImg = new PostImg(req.body);
    try {
      await postImg.save();
      res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  uploadProfileImg: async (req, res) => {
    const profileImg = new ProfileImg(req.body);
    try {
      const savedImageUrl = await profileImg.save();
      res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
};
