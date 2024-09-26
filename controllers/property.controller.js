import { Property } from "../models/property.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { deleteFromClodinary, uploadMultipleImages, upploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new property
export const createProperty = asyncHandler(async (req, res, next) => {
    // get all data , validate data, handle images , save to db
    const {title, description, price, location, propertyType, status} = req.body;
    const propertyImages = req.files?.propertyImages;
    // validate data
    if (!(title && description && price && location && propertyType && status )){
        throw new ApiError(400, "all fields are required");
    }
    if (typeof location !== 'string' || !location.trim()) {
        throw new ApiError(400, "Location must be a non-empty string.");
    }
    // Check propertyType enum
    const validPropertyTypes = ['Residential', 'Commercial'];
    if (!validPropertyTypes.includes(propertyType)) {
        throw new ApiError(400, `Property type must be one of the following: ${validPropertyTypes.join(', ')}.`);
    }

    // Check status enum (if provided)
    const validStatuses = ['Available', 'Sold', 'Under Contract'];
    if (status && !validStatuses.includes(status)) {
        throw new ApiError(400, `Status must be one of the following: ${validStatuses.join(', ')}.`);
    }

    let PropertyImagesArray = [];
    // check images are there if yes then push
    if(req.files && Array.isArray(propertyImages) && propertyImages.length>0){
        try {
            //upload on cloudinary;
            const propertyImagesdata = await uploadMultipleImages(propertyImages);
            PropertyImagesArray = propertyImagesdata.map(e => e?.url);
        } catch (error) {
            throw new ApiError(400, "property Image is not uploaded on cloudinary ")
        }
    }
    console.log('PropertyImagesArray--', PropertyImagesArray);

    //create property
    const property = await Property.create({ //property schema se bola k property create kr do
        userId: req.user._id,
        title,
        description,
        price,
        location,
        propertyType,
        status: status || 'Available', // Default to 'Available'
        propertyImages: PropertyImagesArray || []
    })
    //test property created or not
    // const property = await Property.findById(property._id);
    if (!property){
        throw new ApiError(500, "something went wrong while registering property")
    }

    return res.status(201).json( // data return(res) to frontend
       new ApiResponse(200, property, "property registered successfully")
    );
});

// Get all properties with pagination
export const getProperties = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const properties = await Property.find().skip(skip).limit(limit);
        const totalProperties = await Property.countDocuments();

        return res.status(200).json(
            new ApiResponse(200, { properties, totalProperties }, "Properties fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error fetching properties");
    }
});

// get properties of specific user
export const getPropertiesByUserId = asyncHandler(async (req, res, next) => {
    const id = req.query.id || req.params.id; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate user ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid user ID");
    }

    try {
        const properties = await Property.find({ userId: id }).skip(skip).limit(limit);
        const totalProperties = await Property.countDocuments({ userId: id });

        return res.status(200).json(
            new ApiResponse(200, { properties, totalProperties }, "Properties fetched successfully for user")
        );
    } catch (error) {
        throw new ApiError(500, "Error fetching properties for user");
    }
});


// Get a single property by ID
export const getPropertyById = asyncHandler(async (req, res, next) => {
    const id = req.query.id || req.params.id; 

    // Validate property ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid property ID");
    }

    try {
        const property = await Property.findById(id);

        if (!property) {
            throw new ApiError(404, "Property not found");
        }

        return res.status(200).json(
            new ApiResponse(200, property, "Property fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error fetching property");
    }
});


// Update a property
export const updateProperty = asyncHandler(async (req, res, next) => {
    const id = req.query.id || req.params.id; 
    const { title, description, price, location, propertyType, status } = req.body;

    // Validate property ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid property ID");
    }
    // Validate fields
    if (!(title && description && price && location && propertyType && status)) {
        throw new ApiError(400, "All fields are required");
    }

    const validPropertyTypes = ['Residential', 'Commercial'];
    if (!validPropertyTypes.includes(propertyType)) {
        throw new ApiError(400, `Property type must be one of the following: ${validPropertyTypes.join(', ')}.`);
    }

    const validStatuses = ['Available', 'Sold', 'Under Contract'];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, `Status must be one of the following: ${validStatuses.join(', ')}.`);
    }

    try {
        const property = await Property.findByIdAndUpdate(id, {
            title, description, price, location, propertyType, status
        }, { new: true });

        if (!property) {
            throw new ApiError(404, "Property not found");
        }

        return res.status(200).json(
            new ApiResponse(200, property, "Property updated successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error updating property");
    }
});

// Delete a property
export const deleteProperty = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Validate property ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid property ID");
    }

    try {
        // Find the property and retrieve its images
        const property = await Property.findById(id);
        // console.log('property--', property);
        if (!property) {
            throw new ApiError(404, "Property not found");
        }

        // Delete images from Cloudinary
        const deletePromises = property.propertyImages.map(fileUrl => deleteFromClodinary(fileUrl));
        await Promise.all(deletePromises); // Wait for all delete operations to complete

        // // Now delete the property from the database
        await Property.findByIdAndDelete(id);

        return res.status(200).json(
            new ApiResponse(200, {}, "Property deleted successfully")
        );
    } catch (error) {
        console.error(error); // Log the error for debugging
        throw new ApiError(500, `Error deleting property: ${error}`);
    }
});

