import express from "express";

import {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  getOtherUsers,
  uploadUserAvatar,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/get-user", isAuthenticated, getProfile);
userRouter.patch("/update-user", isAuthenticated, updateProfile);
userRouter.post("/logout", isAuthenticated, logout);
userRouter.get("/get-other-users", isAuthenticated, getOtherUsers);
userRouter.post(
  "/upload/avatar",
  isAuthenticated,
  upload.single("avatar"),
  uploadUserAvatar
);

export default userRouter;
