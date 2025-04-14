import { asyncHandler, errorHandler } from "../utilities/index.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return next(new errorHandler("Invalid Token!", 400));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decodedToken?._id;
  return next();
});
