import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlog,
  getSingleBlog,
} from "../controllers/blog.controller.js";

const router = Router();

// secured routes
router
  .route("/create-blog")
  .post(verifyJWT, upload.single("featuredImage"), createBlog);
router.route("/all-blogs").get(verifyJWT, getAllBlog);
router
  .route("/edit-blog/:slug")
  .put(verifyJWT, upload.single("featuredImage"), editBlog);
router.route("/delete-blog/:slug").delete(verifyJWT, deleteBlog);
router.route("/:slug").get(verifyJWT, getSingleBlog);

export default router;
