import { Router } from "express";
import {
  addClassFees,
  updateClassFee,
  getFullOfFeeStructure,
  deleteFeeStructreClass
} from "../controller/feeStructure.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").get(getFullOfFeeStructure);
router.route("/create").post(verifyJWT, verifyAdmin, addClassFees);
router.route("/:classId")
  .put(verifyJWT, verifyAdmin, updateClassFee)
  .delete(verifyJWT, verifyAdmin, deleteFeeStructreClass);


export default router;
