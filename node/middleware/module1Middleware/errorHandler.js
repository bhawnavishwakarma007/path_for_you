// middleware/errorHandle.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
};

module.exports = errorHandler;