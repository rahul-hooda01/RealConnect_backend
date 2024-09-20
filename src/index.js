import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
});

connectDB()
.then((result) => {
    app.on("error", (error)=>{
        // console.log('eror--', error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is listen on PORT: ${process.env.PORT}`)
    });
}).catch((err) => {
    console.log("MongoDb connection Failed error: ", err);    
});
