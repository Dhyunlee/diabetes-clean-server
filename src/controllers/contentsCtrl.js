import Contents from "../models/contents";

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
  updateContent: async (req, res) => {},
  deleteContent: async (req, res) => {},
  getAllContents: async (req, res) => {
    try {
      const contents = Contents.find();
    } catch (err) {}
  },
  getFindById: async (req, res) => {
    const contentsId = req.params.id;
    try {
      const contents = Contents.findById(contentsId);
      res.status(200).json({ isOk: true, contentsInfo: contents });
    } catch (err) {}
  },
};
