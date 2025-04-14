import { COOKIE_EXPIRE } from "../constants.js";

const cookieSender = (res, token) => {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
};

export { cookieSender };
