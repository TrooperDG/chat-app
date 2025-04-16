const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((err) => next(err));
  //!have to check the err for the next()
};

export { asyncHandler };
