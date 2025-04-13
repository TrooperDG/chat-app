import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { COOKIE_EXPIRE, JWT_EXPIRE } from "../constants.js";
import {
  cookieSender,
  tokenGenerator,
} from "../utilities/cookieHandler.utility.js";

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
    res.status(200).json({
      success: true,
      responseData: {
        user,
        token,
      },
    });
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
    res.status(200).json({
      success: true,
      responseData: {
        newUser,
        token,
      },
    });
  }
});

export { login, register };
