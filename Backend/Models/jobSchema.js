import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  jobType: {
    type: String,
    required: [true, "Job Type is required"],
    enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
  },
  introduction: {
    type: String,
  },
  responsibilities: {
    type: String,
    required: [true, "Responsibilities are required"],
  },
  qualifications: {
    type: String,
    required: [true, "Qualifications are required"],
  },
  offers: {
    type: String,
  },
  salary: {
    type: String,
    required: [true, "Salary is required"],
  },
  hiringMultipleCandidates: {
    type: String,
    default: "No",
    enum: ["Yes", "No"],
  },
  personalWebsite: {
    title: String,
    url: String,
  },
  jobNiche: {
    type: String,
    required: [true, "Job Niche is required"],
  },
  newsLetterSent: {
    // mail sent auto according to niche
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
