const errorController = (error, req, res, next) => {
  console.log("GLOBAL ERROR CONTROLLER");
  console.log(error.stack);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = errorController;
