const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for${Object.keys(
      err.keyValue
    )}field, please choose another value`;
    customError.statusCode = 400;
  }
if (err.code === 'EADDRINUSE'){
  console.log(err);
  customError.msg = `port no ${process.env.PORT} already in use,please coose another port`;
  customError.statusCode = 400;
}
  if (err.name === "ValidationError") {
    //console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name === "CastError"){
    customError.msg = `No item found for id: ${err.value}`;
    customError.statusCode = 404;
  }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });

};

module.exports = errorHandlerMiddleware;
