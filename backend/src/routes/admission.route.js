import { Router } from "express";
import {
  newAdmission,
  updateAdmissionStatus,
  getAllAdmissions,
  deleteAdmission
} from "../controller/admission.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").post(newAdmission);
router.route("/all").get(verifyJWT, verifyAdmin, getAllAdmissions);
router.route("/:admissionId")
  .put(verifyJWT, verifyAdmin, updateAdmissionStatus)
  .delete(verifyJWT, verifyAdmin, deleteAdmission);


export default router;
