import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const messageSchema = new mongoose.Schema({
    messageId: { type: String, required: true, unique: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the sender
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the receiver
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
}, {timestamps:true});
  
propertySchema.plugin(mongooseAggregatePaginate)
export const Message = mongoose.model('Message', messageSchema);
