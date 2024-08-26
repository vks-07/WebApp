import { catchAsyncErrors } from "./cacheAsyncError.js";
import ErrorHandler from "./error.js";
import jwr from "jsonwebtoken"
import {User} from "../Models/userSchema.js"


export const isAuthenticated = catchAsyncErrors(async(req, res, next)=>{

    console.log("isAuthenticated is called");
    
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not Authenticated", 400))
    }
    const decoded =  jwr.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id) 
    console.log("fghjkl; isAuthenticated");
    
    next();
})  

// export const isAuthorized = (...roles)=>{
//     try {
//         console.log("isAuthorized called");
    
//     return(req, res, next)=>{
//         console.log("fghjkl;vbjnkml");
        
//         if(!roles.includes(req.user.role)){
//             return next(new ErrorHandler(`User role ${req.user.role} is not authorized to perform this action`, 403))
//         }
//         console.log("isAuthorized called sfnklnlkdew");
        
//         next();

//     }
//     } catch (error) {
//         return next(new ErrorHandler("error while authorization", 400));
//     }
// }

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        try {
            console.log("isAuthorized called");

            if (!roles.includes(req.user.role)) {
                return next(new ErrorHandler(`User role ${req.user.role} is not authorized to perform this action`, 403));
            }

            console.log("isAuthorized called sfnklnlkdew");

            next();
        } catch (error) {
            next(new ErrorHandler("Error during authorization", 400));
        }
    }
}
