import { Router } from "express";
import {
  createAboutSection,
  getAbout,
  updateSchoolHistory,
  updateMissionVision,
  updatePrincipleMessage,
  addCampusFacility,
  updateCampusFacility,
  deleteCampusFacility
} from "../controller/about.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").get(getAbout);
router.route("/create").post(verifyJWT, verifyAdmin, createAboutSection);
router.route("/school-history").put(verifyJWT, verifyAdmin, updateSchoolHistory);
router.route("/mission-vision").put(verifyJWT, verifyAdmin, updateMissionVision);
router.route("/principle-message").put(verifyJWT, verifyAdmin, updatePrincipleMessage);
router.route("/campus-facility").post(verifyJWT, verifyAdmin, addCampusFacility);
router.route("/campus-facility/:facilityId")
  .put(verifyJWT, verifyAdmin, updateCampusFacility)
  .delete(verifyJWT, verifyAdmin, deleteCampusFacility);


export default router;
