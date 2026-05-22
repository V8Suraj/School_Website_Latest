import { Router } from "express";
import {
  createNewAnnouncement,
  updateAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement
} from "../controller/announcements.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").get(getAllAnnouncements);
router.route("/create").post(verifyJWT, verifyAdmin, createNewAnnouncement);
router.route("/:announcementId")
  .put(verifyJWT, verifyAdmin, updateAnnouncement)
  .delete(verifyJWT, verifyAdmin, deleteAnnouncement);


export default router;
