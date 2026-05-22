const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
        errors: err.errors || {},
        data: null,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

export default globalErrorHandler;
