import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        console.log('process.env.MONGO_URI--', process.env.MONGO_URI);
        const connectionInstance =  await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log(`\n MongoDB connected ... DB HOST : ${connectionInstance.connection.host}`);  //to find on ehich host we are connecting
    } catch (error) {
        console.log("MongoDB connection FAILED", error);
        process.exit(1);
    }
}

export default connectDB;