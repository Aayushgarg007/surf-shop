const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "detxvbsr7",
  api_key: "452761124969478",
  api_secret: process.env.CLOUDINARY_SECRET,
});
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "surf-shop",
    allowed_formats: ["jpeg", "jpg", "png"],
    use_filename: true,
  },
});

module.exports = {
  cloudinary,
  storage,
};
