import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  removeUserAvatar,
  updateUserAvatar,
  userAccountDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").post(verifyJWT, userAccountDetails);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/remove-avatar").delete(verifyJWT, removeUserAvatar);
router.route("/profile/:username").get(verifyJWT, getUserProfile);

export default router;
