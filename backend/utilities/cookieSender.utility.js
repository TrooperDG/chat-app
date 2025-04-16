import { COOKIE_EXPIRE } from "../constants.js";

const cookieSender = (res, token, isRemove = false) => {
  res.cookie("token", token, {
    expires: new Date(
      isRemove ? Date.now() : Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
};

export { cookieSender };
