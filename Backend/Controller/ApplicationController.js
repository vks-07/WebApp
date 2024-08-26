import { catchAsyncErrors } from "../Middleware/cacheAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import { Job } from "../Models/jobSchema.js";
import { Application } from "../Models/applicationSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import app from "../app.js";

// export const postApplication = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { id } = req.params; // job id

//     const { name, email, phone, address, coverLetter } = req.body;

//     if (!name || !email || !phone || !address || !coverLetter) {
//       return next(new ErrorHandler("All fields are required", 400));
//     }

//     const jobSeekerInfo = {
//       id: req.user._id,
//       name,
//       email,
//       phone,
//       address,
//       coverLetter,
//       role: "Job Seeker",
//     };
//     console.log("Job Seeker info: ", jobSeekerInfo);

//     const jobDetails = await Job.findById(id);
//     if (!jobDetails) {
//       return next(new ErrorHandler("Oops job not found", 404));
//     }
//     console.log("Job Details: ", jobDetails);

//     // previously applied or not
//     const isAlreadyApplied = await Application.findOne({
//       jobSeekerInfo: req.user._id,
//       jobInfo: id,
//     });
//     console.log("Job is already applied: ", isAlreadyApplied);

//     if (isAlreadyApplied) {
//       return next(
//         new ErrorHandler("You have already applied for this job", 400)
//       );
//     }

//     if (req.files && req.files.resume) {
//       console.log("Job resume");

//       const { resume } = req.files;
//       try {
//         const cloudinaryResponse = await cloudinary.uploader.upload(
//           resume.tempFilePath,
//           { folder: "Job_Seekers_Resume" }
//         );
//         if (!cloudinaryResponse || cloudinaryResponse.error) {
//           return next(
//             new ErrorHandler("Cloudinary failed to upload resume ", 500)
//           );
//         }
//         jobSeekerInfo.resume = {
//           public_id: cloudinaryResponse.public_id,
//           url: cloudinaryResponse.secure_url,
//         };
//       } catch (error) {
//         return next(new ErrorHandler("Error while uploading resume", 500));
//       }
//     } else {
//       if (req.user && !req.user.resume.url) {
//         return next(
//           new ErrorHandler("No resume found, Please upload resume", 400)
//         );
//       }

//     }
//     jobSeekerInfo.resume = {
//       public_id: req.user.resume.public_id,
//       url: req.user.resume.url,
//     };

//     console.log("Uploading resume job info",jobSeekerInfo.resume);

//     console.log("Uploading resume");

//     const employerInfo = {
//       id: jobDetails.postedBy,
//     };

//     console.log("Uploading employee info",employerInfo);

//     const jobInfo = {
//       jobId: id,
//       jobTitle: jobDetails.title,
//     };
//     console.log("job info", jobInfo);

//     const application = await Application.create({
//         jobSeekerInfo,
//         employerInfo,
//         jobInfo,
//       });

//     console.log("applicatoin", application);

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       application,
//     });

//   } catch (error) {
//     return next(new ErrorHandler("error while submitting application", 400))
//   }
// });

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params; // job id
    const { name, email, phone, address, coverLetter } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // Prepare job seeker information
    const jobSeekerInfo = {
      id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      role: "Job Seeker",
    };

    // Fetch job details
    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
      return next(new ErrorHandler("Oops job not found", 404));
    }

    // Check if the user has already applied for this job
    const isAlreadyApplied = await Application.findOne({
      "jobSeekerInfo.id": req.user._id,
      "jobInfo.jobId": id,
    });
    console.log("isAlreadyApplied: ", isAlreadyApplied);
    
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied for this job", 400)
      );
    }

    // Handle resume upload if provided
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath,
          { folder: "Job_Seekers_Resume" }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return next(
            new ErrorHandler("Cloudinary failed to upload resume", 500)
          );
        }

        jobSeekerInfo.resume = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      } catch (error) {
        return next(new ErrorHandler("Error while uploading resume", 500));
      }
    } else if (req.user.resume && req.user.resume.url) {
      // Use existing resume if not uploading a new one
      jobSeekerInfo.resume = {
        public_id: req.user.resume.public_id,
        url: req.user.resume.url,
      };
    } else {
      return next(
        new ErrorHandler("No resume found, Please upload resume", 400)
      );
    }

    // Prepare employer and job info
    const employerInfo = {
      id: jobDetails.postedBy,
      role: "Employer",
    };

    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };

    // Create the application
    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error while submitting application:", error);
    return next(
      new ErrorHandler(
        "Internal server error while submitting application",
        500
      )
    );
  }
});

export const employerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const applications = await Application.find({
        "employerInfo.id": _id,
        "deletedBy.employer": false,
      });

      res.status(200).json({
        success: true,
        message: "Application is successfully retrieved ",
        applications,
      });
    } catch (error) {
      return next(
        new ErrorHandler("Application error while submitting application", 400)
      );
    }
  }
);
export const jobSeekerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const applications = await Application.find({
        "jobSeekerInfo.id": _id,
        "deletedBy.jobSeeker": false,
      });

      res.status(200).json({
        success: true,
        message: "Application is successfully retrieved ",
        applications,
      });
    } catch (error) {
      return next(new ErrorHandler("Couldn't get application", 400));
    }
  }
);
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  try {
    const {id} = req.params;
    const application = await Application.findById(id)
    if(!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
    const {role} = req.user;
    switch(role) {
      case "Job Seeker":
        application.deletedBy.jobSeeker = true;
        // application.jobSeekerInfo = {};.
      await application.deleteOne();// changes done here

        // await application.save();
        break;
      case "Employer":
        application.deletedBy.employer = true;
        // await application.save();
      await application.deleteOne();// changes done here

        break;
      default:
        return next(new ErrorHandler("Unauthorized to delete this application", 401));
    }
    // remove from database
    if(application.deletedBy.employer === true && application.deletedBy.jobSeeker === true){
      await application.deleteOne();
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error deleting application", 400)); 
  }
});
