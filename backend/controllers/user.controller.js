import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // return res.send("<h1>All fields are required</h1>");
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ email });
  if (!user) return res.send("<h1>email or password is invalid</h1>");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) {
    res.send("<h1>logged in successfully</h1>");
  } else {
    return res.send("<h1>email or password is invalid</h1>");
  }
});

// async function login(req, res) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.send("<h1>All fields are required</h1>");
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.send("<h1>email or password is invalid</h1>");

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (isValidPassword) {
//       res.send("<h1>logged in successfully</h1>");
//     } else {
//       return res.send("<h1>email or password is invalid</h1>");
//     }
//   } catch (error) {
//     res.send("something went wrong");
//     console.log(error);
//   }
// }

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new errorHandler("All fields are required!", 400));
  }

  const user = await User.findOne({ email });
  if (user) {
    return next(new errorHandler("User already exists!", 400));
  }

  //hashing password
  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    email,
    password: passwordHash,
  });

  if (createdUser) res.send("user created");
  // console.log(createdUser);
});

// async function register(req, res) {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     return res.send("<h1>All fields are required</h1>");
//   }
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.send("<h1>user already exists</h1>");
//     }

//     //hashing password
//     const passwordHash = await bcrypt.hash(password, 10);

//     const createdUser = await User.create({
//       username,
//       email,
//       password: passwordHash,
//     });

//     if (createdUser) res.send("user created");
//     // console.log(createdUser);
//   } catch (error) {
//     res.send("something went wrong");
//     console.log(error);
//   }

//   // console.log(req.body);
// }

export { login, register };
