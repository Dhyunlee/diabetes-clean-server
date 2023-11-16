import multer from "multer";
import path from "path";

//savePath: ex) "uploads/userImg"
export const uploadImg = (savePath) =>
  multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, savePath);
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } //5MB(5.24288 MB)
  });
