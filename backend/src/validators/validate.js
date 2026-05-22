import { validationResult } from "express-validator";
import ApiError from '../utils/ApiError.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = {};
  errors.array().forEach(err => {
    if (!formattedErrors[err.path]) {
      formattedErrors[err.path] = [];
    }
    formattedErrors[err.path].push(err.msg);
  });


  return next(new ApiError(422, "Received data is not valid", formattedErrors));
};
