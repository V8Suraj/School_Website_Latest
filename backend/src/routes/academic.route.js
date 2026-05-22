import { Router } from "express";
import {
  newAcadimics,
  updateDepartment
} from "../controller/academic.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/create").post(verifyJWT, verifyAdmin, newAcadimics);
router.route("/department/:departmentId").put(verifyJWT, verifyAdmin, updateDepartment);


export default router;
