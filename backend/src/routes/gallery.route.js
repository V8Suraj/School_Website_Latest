import { Router } from "express";
import { addImage, deleteImage } from "../controller/gallery.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";
import { uploadImage as upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route("/").post(verifyJWT, verifyAdmin, upload.single("image"), addImage);
router.route("/:imageId").delete(verifyJWT, verifyAdmin, deleteImage);


export default router;
