import { Router } from "express";
import { currentPasswordChange, getCurrentUser, loginUser, logoutUser, refreshAcessToken, registerUser, updateAccountDetails, updateUserAvatar } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(upload.fields([{ name: "avatar", maxCount:1 }]), registerUser);
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser) 
// verifyJWT middleware m cookies se jwt token verify krke uski id se db m call ki or
// user info req m bhejdi taaki on that basis logout kr ske

router.route("/refresh-token").post(verifyJWT, refreshAcessToken);
router.route("/resetPassword").post(verifyJWT, currentPasswordChange);
router.route("/getCurrentUser").post(verifyJWT, getCurrentUser);
router.route("/updateAccoutDetails").post(verifyJWT, updateAccountDetails);
router.route("/updateUserAvatar").post( upload.single("avatar"), verifyJWT, updateUserAvatar);

export default router;