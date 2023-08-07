import { Like } from "../models/like.js";
/**
 * @description Contents 및 Comment 정보를 담는 객체를 만들어주는 함수
 * @param request
 */
function createContentsOrCommentObj(req) {
  let variable = {};
  if (req.body.contentsId) {
    //userId: 로그인한 유저
    variable = {
      userId: req.body.userId,
      contentsId: req.body.contentsId,
      contentsType: "contents"
    };
    return variable;
  } else {
    variable = {
      commentId: req.body.commentId,
      userId: req.body.userId,
      contentsType: "comment"
    };
    return variable;
  }
}

export const likeCtrl = {
  postLike: async (req, res) => {
    let like;
    if (req.body.contentsId) {
      const variable = createContentsOrCommentObj(req);
      const findLike = await Like.find(variable);
      console.log({ findLike });
      if (findLike.length) {
        return res
          .status(403)
          .json({ isOk: false, msg: "이미 게시글 좋아요를 추가했습니다." });
      }
      like = new Like(variable);
    } else {
      const variable = createContentsOrCommentObj(req);
      const findLike = await Like.find(variable);
      if (findLike.length) {
        return res
          .status(403)
          .json({ isOk: false, msg: "이미 댓글 좋아요를 추가했습니다." });
      }
      like = new Like(variable);
    }

    try {
      await like.save();
      res.status(200).json({ isOk: true, msg: "좋아요를 추가했습니다." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  contentsUnLike: async (req, res) => {
    //유저가 좋아요한 게시글을 찾아서
    // 좋아요한 게시글을 취소
    // const like = await Like.findById(req.params.id);
    console.log("컨텐츠 취소");
    try {
      await Like.find()
        .where("userId")
        .equals(req.params.id)
        .deleteOne({ contentsId: req.body.contentsId });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 컨텐츠의 좋아요가 취소되었습니다." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  commentUnLike: async (req, res) => {
    //유저가 좋아요한 게시글을 찾아서
    // 좋아요한 게시글을 취소
    // const like = await Like.findById(req.params.id);
    try {
      await Like.find()
        .where("userId")
        .equals(req.params.id)
        .deleteOne({ commentId: req.body.commentId });
      return res
        .status(200)
        .json({ isOk: true, msg: "해당 컨텐츠의 좋아요가 취소되었습니다." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getContentsLike: async (req, res) => {
    //가져올때는 request parameter로 요청 받기
    const like = await Like.find()
      .where({
        contentsId: req.params.id
      })
      .populate("contentsId");

    if (!like) {
      return res.status(403).json({
        isOk: false,
        msg: "해당 게시글의 좋아요 정보가 존재하지 않습니다."
      });
    }

    try {
      console.log({ like });
      res.status(200).json({ isOk: true, like });
    } catch (err) {
      console.log(err);
      res.status(500).json({ isOk: false, err });
    }
  },
  getCommentsLike: async (req, res) => {
    //가져올때는 request parameter로 요청 받기
    const like = await Like.find()
      .where({
        commentId: req.params.id
      })
      .populate("commentId");
    if (!like) {
      return res.status(403).json({
        isOk: false,
        msg: "해당 댓글의 좋아요 정보가 존재하지 않습니다."
      });
    }

    try {
      console.log({ like });
      res.status(200).json({ isOk: true, like });
    } catch (err) {
      console.log(err);
      res.status(500).json({ isOk: false, err });
    }
  }
};
