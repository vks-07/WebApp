// cacheAsyncError.js
export const catchAsyncErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  /*Benefits:

    Simplifies Code: No need for repetitive try/catch blocks in each route handler or middleware.
    Error Propagation: Ensures that any error in an asynchronous operation is properly propagated to the error-handling middleware.*/