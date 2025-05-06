import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  asyncHandler,
  errorHandler,
  cookieSender,
  tokenGenerator,
  responseHandler,
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

  //avatar generate
  const avatarType = gender === "male" ? "boy" : "girl";
  const avatarURL = `https://avatar.iran.liara.run/public/${avatarType}?username=${email}`;

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
  const updatedUser = await await User.findByIdAndUpdate(
    req.userId,
    { $set: req.body },
    { new: true }
  );
  if (updatedUser) responseHandler(res, 200, updatedUser);
});

const logout = asyncHandler(async (req, res, next) => {
  cookieSender(res, "", true);
  responseHandler(res, 200, "Logged out");
});

const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.userId } });

  responseHandler(res, 200, otherUsers);
});

export { login, register, getProfile, updateProfile, logout, getOtherUsers };
