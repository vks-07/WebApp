class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export default ErrorHandler;
  

  export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
  
    // Handle specific errors
    if (err.name === 'CastError') {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
    }
  
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === 'JsonWebTokenError') {
      const message = `Invalid JSON Web Token. Try again.`;
      err = new ErrorHandler(message, 400);
    }
  
    if (err.name === 'TokenExpiredError') {
      const message = `JSON Web Token has expired. Try again.`;
      err = new ErrorHandler(message, 400);
    }
  
    // Send response
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        statusCode: err.statusCode,
      },
    });
  };
  