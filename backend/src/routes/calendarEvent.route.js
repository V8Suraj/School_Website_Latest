import { Router } from "express";
import {
  newEvent,
  updateEvent,
  getAllEvents,
  deleteEvent
} from "../controller/calendarEvent.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router();

router.route("/").get(getAllEvents);
router.route("/create").post(verifyJWT, verifyAdmin, newEvent);
router.route("/:calendarEventId")
  .put(verifyJWT, verifyAdmin, updateEvent)
  .delete(verifyJWT, verifyAdmin, deleteEvent);


export default router;
