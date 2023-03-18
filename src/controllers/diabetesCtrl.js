import Diabetes from "../models/diabetes.js";

export const diabetesCtrl = {
  postDiabetes: async (req, res) => {
    const newDiabetes = new Diabetes(req.body);
    try {
      await newDiabetes.save();
      res.status(200).json({ isOk: true, msg: '성공적으로 저장되었습니다.' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteDiabetes: async (req, res) => {
    try {
      const diabetes = await Diabetes.findById(req.params.id).populate("writer", "nickname");
      const writedUserId = diabetes.writer._id;
      const currentUserId = req.user._id;
      
      if(writedUserId.equals(currentUserId)) {
        await Diabetes.deleteOne({ _id: req.params.id });
        return res.status(200).json({ isOk: true, msg: '성공적으로 삭제되었습니다.'});
      } else {
        return res.status(403).json({ isOk: false, msg: '작성자만 삭제할 수 있습니다.'});
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllDiabetes: async (req, res) => {
    console.log(req.params);
    const writer = req.params.userId;
    try {
      const diabetes = await Diabetes.find({ writer })
        .sort({ _id: -1 }) // 내림차순 정렬
        .populate("writer", "nickname");
      res.status(200).json({ isOk: true, diabetesInfo: diabetes });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getFindById: async (req, res) => {
    const diabetesId = req.params.id;
    try {
      const diabetes = await Diabetes.findById(diabetesId).populate("writer", "nickname");
      console.log(diabetes);
      res.status(200).json({ isOk: true, diabetesInfo: diabetes });
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  },
};
