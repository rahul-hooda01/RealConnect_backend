// const asyncHandler = ()=>{}
// const asyncHandler = (func)=>{()=>{ ye h sllbck}}
// const asyncHandler = (func)=>async()=>{ ye h sllbck};   ye highorder function accept kr rha h  param as  a function
// or vo functyion async h or usme jo response aayega vo callback dena pdega to ye structure liye- ()=>async()=>{}

// const asyncHandler = (fn)=>async(req,res,next)=>{
//     try {
//         await fn(req,res,next())
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// };

// or ye method v use kr skte h

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err));
    }
}

export {asyncHandler};