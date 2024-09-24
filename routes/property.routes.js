import { Router } from "express";
import { createProperty } from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Create a new property (secured)
router.route("/addroperty").post(upload.fields([{ name: "propertyImages", maxCount:5 }]), verifyJWT, createProperty);

// // Get all properties (pagination included)
// router.route("/getAllProperties").get(getProperties);

// // Get all properties of a perticular agent (pagination included)
// router.route("/getAllPropertiesByUserId:id").get(getPropertiesByUserId);

// // Get a specific property by ID
// router.route("/getPropertyById:id").get(getPropertyById);

// // Update a property by ID (secured)
// router.route("/updateProperty:id").put(verifyJWT, updateProperty);

// // Delete a property by ID (secured)
// router.route("/deleteProperty:id").delete(verifyJWT, deleteProperty);

export default router;
