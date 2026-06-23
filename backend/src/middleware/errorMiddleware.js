// Handle 404 - Route not found
// This runs when someone hits a URL that doesn't exist in our app
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass error to errorHandler below
};

// Global Error Handler
// This runs whenever next(error) is called anywhere in the app
const errorHandler = (err, req, res, next) => {
  // Sometimes error comes with 200 status by mistake, force it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Only show detailed error stack in development, not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };