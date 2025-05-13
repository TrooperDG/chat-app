import { v2 as cloudinary } from "cloudinary";

//! rocess.env.CLOUDINARY_* dont work need to fix it later, for now added this in the controller

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
