export const responseHandler = (
  res,
  statusCode = 200,
  resposeData = {},
  success = true
) => {
  res.status(statusCode).json({
    success: success,
    responseData: resposeData,
  });
};
