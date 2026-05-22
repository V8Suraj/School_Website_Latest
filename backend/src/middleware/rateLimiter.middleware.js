import rateLimit from 'express-rate-limit';
import ApiError from '../utils/ApiError.js';

// Common handler
const limiterHandler = (req, res, next, options) => {
    const retryAfterMinutes = Math.ceil(options.windowMs / 1000 / 60);
    return next(new ApiError(
        429,
        options.message || `Too many requests. Try again after ${retryAfterMinutes} minutes`
    ));
};

// 1. GLOBAL LIMITER
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, try again after 15 minutes",
    handler: limiterHandler
});

// 2. STRICT AUTH LIMITER - Login/Register/Forgot Password
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: "Too many auth attempts. Try again after 15 minutes",
    handler: limiterHandler,
    skipSuccessfulRequests: true
});

// 3. EMAIL/OTP LIMITER
export const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 3,
    message: "Too many OTP requests. Try again after 1 hour",
    handler: limiterHandler
});


export const createContentLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    message: "You are creating content too fast. Slow down",
    handler: limiterHandler
});
