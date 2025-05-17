import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import {
  asyncHandler,
  errorHandler,
  cookieSender,
  tokenGenerator,
  responseHandler,
  // cloudinary,
} from "../utilities/index.js";

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //checki valid inputs
  if (!email || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  //check if user exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new errorHandler("Email or Password is Invalid!", 401));

  const isValidPassword = await bcrypt.compare(password, user.password);

  //send response
  if (isValidPassword) {
    const token = tokenGenerator(user._id);
    cookieSender(res, token);
    responseHandler(res, 200, { user, token });
  } else {
    return next(new errorHandler("Email or Password is Invalid!", 401));
  }
});

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, gender } = req.body;

  //check valid inputs
  if (!username || !email || !password || !gender) {
    return next(new errorHandler("All fields are required!", 400));
  }

  //check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("User already exists!", 409));
  }

  //hash password
  const passwordHash = await bcrypt.hash(password, 10);

  //generate avatar
  const avatarURL =
    gender === "male"
      ? "https://res.cloudinary.com/dlzdikyzx/image/upload/v1747316994/male_avatar_ppiktx.png"
      : "https://res.cloudinary.com/dlzdikyzx/image/upload/v1747316991/female_avatar_yaqtj8.png";

  //create new user
  const newUser = await User.create({
    username,
    email,
    password: passwordHash,
    avatar: avatarURL,
    gender,
  });

  //send respsonse and cookie
  if (newUser) {
    const token = tokenGenerator(newUser._id);
    cookieSender(res, token);
    responseHandler(res, 201, { user: newUser, token });
  }
});

const getProfile = asyncHandler(async (req, res, next) => {
  const userData = await User.findById(req.userId);
  if (userData) responseHandler(res, 200, userData);
});
const updateProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $set: req.body },
    { new: true }
  );
  if (updatedUser) responseHandler(res, 200, updatedUser);
  res.end();
});

const logout = asyncHandler(async (req, res, next) => {
  cookieSender(res, "", true);
  responseHandler(res, 200, "Logged out");
});

const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.userId } });

  responseHandler(res, 200, otherUsers);
});

//----------------------------------------------------------

import { v2 as cloudinary } from "cloudinary";

const uploadUserAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new errorHandler("file does not exist!", 400));
  }

  //! using the cloudinary config here , because process.en.CLOUDINARY_* shows undifined in cloudinary.utility.js
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Get current user and their existing avatar public_id
  const user = await User.findById(req.userId);

  //* when saving in memory  use this base64Image instead of req.file.path
  // const base64Image = `data:${
  //   req.file.mimetype
  // };base64,${req.file.buffer.toString("base64")}`;

  // Upload new avatar
  const cldResponse = await cloudinary.uploader.upload(req.file.path, {
    folder: "/user-avatars",
  });
  fs.unlinkSync(req.file.path); // Delete local file after upload // when using diskStorage

  // Save new avatar URL and public_id to the database
  if (cldResponse) {
    await User.findByIdAndUpdate(req.userId, {
      avatar: cldResponse.url,
      avatarPublicId: cldResponse.public_id,
    });
  }

  // Delete old avatar from Cloudinary if it exists
  if (user?.avatarPublicId) {
    await cloudinary.uploader.destroy(user.avatarPublicId);
  }

  responseHandler(res, 200, { avatar: cldResponse.url });
});

export {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  getOtherUsers,
  uploadUserAvatar,
};
