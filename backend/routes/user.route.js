import express from "express";
import { login } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/login", login);

export default userRouter;
