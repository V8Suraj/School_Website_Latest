import { body } from "express-validator";

const authRegisterValidator = () => {
  return [
    // username
    body("username")
      .trim()
      .notEmpty().withMessage("Username is required")
      .isLowercase().withMessage("Username must be lowercase only")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters"),

    // email
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),

    // password
   body("password")
      .notEmpty().withMessage("Password is required").bail()
      .isLength({ min: 8, max: 16 })
      .withMessage("Password must be 8–16 characters long").bail()
      .isStrongPassword()
      .withMessage("Password must include uppercase, lowercase, number, and symbol"),

    // secret key
    body("secretKey")
      .trim()
      .notEmpty()
      .withMessage("Secret key is required")
  ];
};


const authloginValidator = () => {
     return [
    // email
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),

    // password
   body("password")
      .notEmpty().withMessage("Password is required").bail()
      .isLength({ min: 8, max: 16 })
      .withMessage("Password must be 8–16 characters long").bail()
      .isStrongPassword()
      .withMessage("Password must include uppercase, lowercase, number, and symbol"),
  ];
}

const authChangeCurrentPasswordValidator = () => {
    return [
      body("oldPassword")
      .notEmpty().withMessage("oldPassword is required").bail(),
      body("newPassword")
      .notEmpty().withMessage("New Password is required").bail()
      .isLength({ min: 8, max: 16 })
      .withMessage("New Password must be 8–16 characters long").bail()
    ]
}

export {
  authRegisterValidator,
  authloginValidator,
  authChangeCurrentPasswordValidator
};
