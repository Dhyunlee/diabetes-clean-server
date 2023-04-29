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
  updateContents: async (req, res) => {
    try {
      const contents = await Contents.indById(req.params.id).populate(
        "writer",
        "nickname"
      );
      const writedUserId = contents.writer._id;
      const currentUserId = req.user._id;
      if (writedUserId.equals(currentUserId)) {
        await Contents.updateOne(
          { _id: writedUserId },
          {
            $set: req.body,
          }
        );
        return res
          .status(200)
          .json({ isOk: true, msg: "성공적으로 수정되었습니다." });
      } else {
        return res
          .status(403)
          .json({ isOk: false, msg: "작성자만 수정할 수 있습니다." });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteContents: async (req, res) => {
    try {
      const contents = await Contents.findById(req.params.id).populate(
        "writer",
        "nickname"
      );
      const writedUserId = contents.writer._id;
      const currentUserId = req.user._id;

      if (writedUserId.equals(currentUserId)) {
        await Contents.deleteOne({ _id: writedUserId });
        return res
          .status(200)
          .json({ isOk: true, msg: "성공적으로 삭제되었습니다." });
      } else {
        return res
          .status(403)
          .json({ isOk: false, msg: "작성자만 삭제할 수 있습니다." });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllContents: async (req, res) => {
    try {
      const contents = await Contents.find().populate(
        "writer",
        "nickname"
      );
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllUserContents: async (req, res) => {
    try {
      const contents = await Contents.find({writer: req.params.id}).populate(
        "writer",
        "nickname"
      );
      res.status(200).json({ isOk: true, contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getFindById: async (req, res) => {
    const contentsId = req.params.id;
    console.log({contentsId})
    try {
      const contents = await Contents.findById(contentsId).populate(
        "writer",
        "nickname"
      );
      console.log(contents)
      res.status(200).json({ isOk: true, contentsInfo: contents });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
