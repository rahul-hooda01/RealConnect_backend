import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,  //will use cloudinary
    },
    mobileNumber: { 
        type: String, 
        required: true, 
        unique: true
    }, // Mobile number for WhatsApp communication
    companyName: { 
        type: String, 
    }, // Company name field
    subscriptionTier: { 
        type: String, 
        enum: ['Basic', 'Pro', 'Premium'], 
        default: 'Basic' 
    },
    properties: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Property' 
    }], // Reference to properties listed by the user
    password: {
        type:String,
        required:[true, 'Password is required'],
    },
    refreshToken: {
        type:String
    }

}, {timestamps:true});

userSchema.pre("save", async function (next){  // userSchema save krne se just phle ye operation krne h 
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
}) // is se password encrypt ho gya and db m store ho gya

userSchema.methods.isPasswordCorrect = async function (password) { // nya method bnaya h ye db m is key se store hoga sayad 
    // console.krke dekhna h this.password or normal pasword ka
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName:this.userName,
            // fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", userSchema);