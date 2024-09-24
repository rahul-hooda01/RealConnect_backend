import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:  process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const upploadOnCloudinary = async(localPath)=>{
    try {
        if(!localPath) return null;
        //upload filepath to cloudinary
        const response = await cloudinary.uploader.upload(localPath,
            { resource_type: 'auto'})

        // file succesfully upload
        // console.log('file succesfully upload', response);
        fs.unlinkSync(localPath); //remove completely then return response;
        return response;
    } catch (error) {
        fs.unlinkSync(localPath) // remove file from temp folder as upload opertaion got failed to dobara se reupload kro local m v or clod p bhi
        return null;
    }
}
// Function to upload multiple images accept array contains data of images
const uploadMultipleImages = async (images) => {
    // console.log(' inside multiple images;', images)
    try {
        const uploadPromises = images.map(async (image) => {
            return await upploadOnCloudinary(image?.path)
        })
        console.log(' calling promisea.all---');
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error('Error uploading images:', error);
        return null;
    }
  };

const deleteFromClodinary = async(fileUrl)=>{

    const publicId = fileUrl?.split('/').pop().split('.')[0]; 
    try {
        cloudinary.api
        .delete_resources([publicId], 
            { type: 'upload', resource_type: 'image' })
        .then(console.log("File delete successfully"));
    } catch (error) {
        console.log("Error while deleting old file");
    }
}

export {upploadOnCloudinary, uploadMultipleImages, deleteFromClodinary};
