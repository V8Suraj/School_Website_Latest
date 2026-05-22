import { Router } from "express";
import {
  changeCurrentPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from "../controller/user.controller.js";
import {
  authChangeCurrentPasswordValidator,
  authloginValidator,
  authRegisterValidator
} from "../validators/auth.validators.js";
import { validate } from "../validators/validate.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/signup")
  .post(authRegisterValidator(), validate, registerUser);

router.route("/login")
  .post(authloginValidator(), validate, loginUser);

router.route("/logout")
  .get(verifyJWT, logoutUser);

router.route("/update-profile")
  .put(verifyJWT, updateUserProfile);

router.route("/get")
  .get(verifyJWT, getUser);

router.route("/change-current/password")
  .put(verifyJWT, authChangeCurrentPasswordValidator(), validate, changeCurrentPassword);


export default router;
