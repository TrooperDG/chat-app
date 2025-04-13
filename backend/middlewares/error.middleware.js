export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error!";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    errorMessage: err.message,
  });
};
