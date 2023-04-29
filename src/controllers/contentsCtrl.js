import Contents from "../models/contents.js";

export const contentsCtrl = {
  postContents: async (req, res) => {
    const newContents = new Contents(req.body);
    try {
      await newContents.save();
      res.status(200).json({ isOk: true, msg: "성공적으로 저장되었습니다." });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteContents: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id);
      if (!contents) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      await contents.updateOne({
        $set: req.body,
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 게시물이 삭제되었습니다." });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateContents: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id);
      if (!contents) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      await contents.updateOne({
        $set: req.body,
      });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 게시물이 수정되었습니다." });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllContents: async (req, res) => {
    try {
      const contents = await Contents.find().populate(
        "writer",
        "nickname imageSrc"
      );
      if (!contents) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllUserContents: async (req, res) => {
    try {
      const contents = await Contents.find()
        .where("writer")
        .equals(req.user._id)
        .populate("writer", "nickname imageSrc");

      if (!contents) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getFindById: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id).populate(
        "writer",
        "nickname imageSrc"
      );
      if (!contents) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 게시글이 존재하지 않습니다." });
      }
      console.log({contents})
      res.status(200).json({ isOk: true, contentsInfo: contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
