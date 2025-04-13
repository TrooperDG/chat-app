const responseHandler = (res, statusCode = 200, resposeData = {}) => {
  res.status(statusCode).json({
    success: true,
    responseData,
  });
};
