import jwt from "jsonwebtoken";
import { COOKIE_EXPIRE, JWT_EXPIRE } from "../constants.js";

const tokenGenerator = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

const cookieSender = (res, token) => {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
};

export { tokenGenerator, cookieSender };
