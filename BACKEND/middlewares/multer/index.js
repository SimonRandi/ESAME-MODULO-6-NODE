const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { saveOnCloud } = require("../../controller/post.controller");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const InternalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `image-${uniqueSuffix}.${fileExtension}`;
    cb(null, fileName);
  },
});

const CloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EPICODE",
    format: async (request, file) => "jpeg",
    public_id: (request, file) => file.originalname,
  },
});

const upload = multer({ storage: InternalStorage });
const cloudUpload = multer({ storage: CloudStorage });

module.exports = {
  upload,
  cloudUpload,
};
