import app from "./app.js";// module type ke karan .js bhi lgana pad rha hai
// import 
import  cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,

})

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on 4000");
    
})



