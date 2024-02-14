import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";

//savePath: ex) "uploads/userImg"

export const coludinayUploadImg = (public_id) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "ugt3hafu",
      format: async (req, file) => "png",
      public_id: (req, file) => public_id
    }
  });
  multer({ storage });
};

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
