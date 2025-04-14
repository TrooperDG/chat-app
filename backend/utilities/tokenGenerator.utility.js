import jwt from "jsonwebtoken";
import { JWT_EXPIRE } from "../constants.js";

export const tokenGenerator = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
