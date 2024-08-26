import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { validate } from "node-cron";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain atleast 3 characters"],
    maxLength: [30, "Name can't exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain atleast 8  characters"],
    maxLength: [32, "Password can't exceed 30 characters"],
    select:false,
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);

})

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJwtToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn:process.env.JWT_EXPIRE
  })
}

export const User = mongoose.model("User",userSchema)



// userSchema.methods.getJwtToken = function() {
//   if (!process.env.JWT_SECRET_KEY) {
//       throw new Error('JWT_SECRET_KEY is not set in environment variables');
//   }

//   const expiresIn = process.env.JWT_EXPIRE || '1h'; // Default to 1 hour if not set

//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn
//   });
// };