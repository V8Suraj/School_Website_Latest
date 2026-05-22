import { Router } from "express";
import {
  newNotice,
  updateNotice,
  getAllNotice,
  deleteNotice
} from "../controller/notice.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").get(getAllNotice);
router.route("/create").post(verifyJWT, verifyAdmin, newNotice);
router.route("/:noticeId")
  .put(verifyJWT, verifyAdmin, updateNotice)
  .delete(verifyJWT, verifyAdmin, deleteNotice);


export default router;
