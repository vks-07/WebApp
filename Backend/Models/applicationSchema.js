import mongoose from "mongoose";
import validator from "validator";
const applicationSchema = new mongoose.Schema({
  jobSeekerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validator: [validator.email, "please enter a valid email"],
    },
    phone: {
      type: Number,
      required: true,
      minLength: 10,
      maxLength: 10,
    },
    address: {
      type: String,
      required: true,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker"],
    },
  },
  employerInfo:{
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["Employer"],
    },

  },
  jobInfo:{
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",// it is commented
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    }

  },

  deletedBy:{
    jobSeeker:{
        type:Boolean,
        default: false,
    },
    employer:{
        type: Boolean,
        default: false,
    }
  }
});

export const Application = mongoose.model("Application", applicationSchema);