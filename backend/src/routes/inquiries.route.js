import { Router } from "express";
import {
  newInquirie,
  updateInquirie,
  getInquirie,
  deleteInquirie
} from "../controller/inquirie.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").post(newInquirie);
router.route("/all").get(verifyJWT, verifyAdmin, getInquirie);
router.route("/:inquirieId")
  .put(verifyJWT, verifyAdmin, updateInquirie)
  .delete(verifyJWT, verifyAdmin, deleteInquirie);


export default router;
