import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadImg } from "../utils/uploadImg.js";
import { imageCtrl } from "../controllers/imageCtrl.js";
import auth from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.resolve(path.join(__dirname, "..")); // Adjust this line based on your actual folder structure
const uploadsPath = path.join(srcPath, "uploads");

const router = express.Router();

// @routes     POST api/v1/image
// @desc       cloudinary에 업로드한 이미지 삭제
router.post("/", auth, imageCtrl.deleteUploadedImg);

// @routes     POST api/v1/image/signature
// @desc       cloudinary signature 생성
// router.post("/upload", coludinayUploadImg,imageCtrl.uploadImg);

// @routes     POST api/v1/image/uimg
// @desc       프로필이미지
router.post(
  "/uimg",
  (req, res, next) => {
    const userImgPath = path.join(uploadsPath, "userImg");

    try {
      fs.readdirSync(userImgPath);
      next();
    } catch (error) {
      console.error(`${userImgPath} 폴더가 없어 생성합니다.`);
      fs.mkdirSync(userImgPath, { recursive: true });
      next();
    }
  },
  uploadImg(path.join(uploadsPath, "userImg")).single("profileImg"),
  (req, res) => {
    res.json({ isOk: true, imgPath: `img/uimg/${req.file.filename}` });
  }
);

// @routes     POST api/v1/image/pimg
// @desc       게시글 이미지
router.post(
  "/pimg",
  (req, res, next) => {
    const postImgPath = path.join(uploadsPath, "postImg");

    try {
      fs.readdirSync(postImgPath);
      next();
    } catch (error) {
      console.error(`${postImgPath} 폴더가 없어 생성합니다.`);
      fs.mkdirSync(postImgPath, { recursive: true });
      next();
    }
  },
  uploadImg(path.join(uploadsPath, "postImg")).array("postImg", 6),
  (req, res) => {
    const imgPaths = req.files.map((file) => `/pimg/${file.filename}`);
    res.json({ isOk: true, imgPaths });
  }
);

export default router;
