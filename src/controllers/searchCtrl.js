import qs from "qs";
import Contents from "../models/contents.js";
import { getPaging } from "../utils/getPaging.js";

export const searchCtrl = {
  // 컨텐츠 검색
  getSearchContents: async (req, res) => {
    try {
      const { keyword } = qs.parse(req.query);
      const [currentPage, listSize, totalContents] = await getPaging(
        qs.parse(req.query),
        { $text: { $search: keyword } },
        Contents
      );
      const contents = await Contents.find()
        .where({
          $text: { $search: keyword }
        })
        .sort({ createdAt: -1 })
        .skip(listSize * (currentPage - 1))
        .limit(listSize)
        .populate("writer", "nickname imageSrc");

      if (!totalContents) {
        return res.status(404).json({
          isOk: false,
          likedPost: [],
          msg: "검색 결과가 없습니다."
        });
      }
      res.status(200).json({ isOk: true, contents, total: totalContents });
    } catch (err) {
      res.status(500).json({ isOk: false, err });
    }
  }
};
