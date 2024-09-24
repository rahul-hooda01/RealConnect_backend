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
            propertyImagesdata.map((e) => PropertyImagesArray.push(e?.url));
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
        status: status || '',
        propertyImages: PropertyImagesArray || []
    })
    //test property created or not
    const propertyCreated = await Property.findById(property._id);
    if (!propertyCreated){
        throw new ApiError(500, "something went wrong while registering property")
    }

    return res.status(201).json( // data return(res) to frontend
       new ApiResponse(200, propertyCreated, "property registered successfully")
    );
});

// Get all properties with pagination
export const getProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const properties = await Property.aggregatePaginate({}, { page, limit });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
export const updateProperty = async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: "Property not found" });
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a property
export const deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) return res.status(404).json({ message: "Property not found" });
        res.status(200).json({ message: "Property deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
