import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const propertySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who listed the property
    title: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    location: { type: String, required: true },
    propertyType: { type: String, enum: ['Residential', 'Commercial'], required: true },
    status: { type: String, enum: ['Available', 'Sold', 'Under Contract'], default: 'Available' },
    propertyImages: [{ type: String }], // Array of image URLs
}, {timestamps:true});
  
propertySchema.plugin(mongooseAggregatePaginate)
export const Property = mongoose.model('Property', propertySchema);
