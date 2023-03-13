import Diabetes from "../models/diabetes.js";

export const diabetesCtrl = {
   postDiabetes: async (req, res) => {
    const newDiabetes = new Diabetes(req.body);
    try {
      const savedDiabetes = await newDiabetes.save();
      res.status(200).json(savedDiabetes);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
   deleteDiabetes: async (req, res) => {
    try {
      await Diabetes.deleteOne({ _id: req.params.id });
      res.status(200).json("삭제되었습니다.");
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
      res.status(200).json(diabetes);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
   getFindById: async (req, res) => {
    const diabetesId = req.params.id;
    try {
      const diabetes = await Diabetes.findById(diabetesId).populate(
        "writer",
        "nickname"
      );
      res.status(200).json(diabetes);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}