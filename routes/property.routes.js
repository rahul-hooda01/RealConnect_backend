import { Router } from "express";
import { createProperty, getProperties, getPropertiesByUserId, getPropertyById, updateProperty, deleteProperty } from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Create a new property (secured)
router.route("/addProperty").post(upload.fields([{ name: "propertyImages", maxCount:5 }]), verifyJWT, createProperty);

// Get all properties (pagination included)
router.route("/getAllProperties").get(getProperties);

// Get all properties of a particular agent (pagination included)
router.route("/getAllPropertiesByUserId").get(verifyJWT, getPropertiesByUserId);

// Get a specific property by ID
router.route("/getPropertyById/:id").get(getPropertyById);

// Update a property by ID (secured)
router.route("/updateProperty/:id").put(verifyJWT, updateProperty);

// Delete a property by ID (secured)
router.route("/deleteProperty/:id").delete(verifyJWT, deleteProperty);


export default router;
