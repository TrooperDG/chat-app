import express from "express";
import {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  getOtherUsers,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/get-user", isAuthenticated, getProfile);
userRouter.patch("/update-user", isAuthenticated, updateProfile);
userRouter.post("/logout", isAuthenticated, logout);
userRouter.get("/get-other-users", isAuthenticated, getOtherUsers);

export default userRouter;
