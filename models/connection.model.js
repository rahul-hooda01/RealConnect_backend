import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const connectionSchema = new mongoose.Schema({
    connectionId: { type: String, required: true, unique: true },
    userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the first user
    userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the second user
    status: { type: String, enum: ['Pending', 'Connected', 'Blocked'], default: 'Pending' },
}, {timestamps:true});
  
propertySchema.plugin(mongooseAggregatePaginate)
export const Connection = mongoose.model('Connection', connectionSchema);
