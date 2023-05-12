import Comment from "../models/comment.js";

export const commentCtrl = {
  postComment: async (req, res) => {
    const comment = new Comment(req.body);
    try {
      await comment.save();
      res.status(200).json({ isOk: true, msg: "댓글이 등록되었습니다." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 댓글이 존재하지 않습니다." });
      }
      await comment.updateOne({
        $set: req.body,
      });
      return res
        .status(200)
        .json({ isOk: false, msg: "해당 댓글이 삭제되었습니다." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).populate(
        "writer",
        "nickname"
      );
      if (!comment) {
        return res
          .status(403)
          .json({ isOk: false, msg: "해당 댓글이 존재하지 않습니다." });
      }
      await comment.deleteOne();
      return res
        .status(200)
        .json({ isOk: false, msg: "해당 댓글이 수정되었습니다." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllComment: async (req, res) => {
    //해당 게시글에 작성된 모든 댓글
    try {
      const comment = await Comment.find({
        contentsId: req.params.contentsId,
      }).sort({ createdAt: -1 }).populate("writer", "nickname imageSrc");
      console.log({comment});
      res.status(200).json({ isOk: true, comment });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserComment: async (req, res) => {
    //유저가 작성한 댓글 모음
    try {
      const comment = await Comment.find({
        writer: req.params.userId,
      })
        .sort({ createdAt: -1 })
        .populate("writer", "nickname imageSrc");
      console.log({ comment });
      res.status(200).json({ isOk: true, comment });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
