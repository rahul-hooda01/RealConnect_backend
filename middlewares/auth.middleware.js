import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    // we have cookies acess because cookie parsre.use middleware lgaya that app.js m 

   try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearrer", "") // headers m frontend se authorization field m bearer: <accessToken> bhejt h
 
     if(!token){
         throw new ApiError(401, "Unauthorization request")
     }
 
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)  // decoded token na aaye to await lgana
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     if(!user){
         throw new ApiError(404,"Invalid Access Token")
     }
     req.user = user;
     next();
   } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
   }


})