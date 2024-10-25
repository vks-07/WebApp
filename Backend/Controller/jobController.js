import { catchAsyncErrors } from "../Middleware/cacheAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import { Job } from "../Models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log("postJob called");

    const {
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilities, // corrected spelling
      qualifications, // corrected spelling
      offers,
      salary,
      hiringMultipleCandidates,
      personalWebsiteTitle,
      personalWebsiteUrl,
      jobNiche,
      newsLetterSent,
    } = req.body;

    // console.log("zfgghjkj");

    // console.log(details);

    if (
      !title ||
      !jobType ||
      !location ||
      !companyName ||
      !introduction ||
      !responsibilities ||
      !qualifications ||
      !salary ||
      !jobNiche
    ) {
      return next(new ErrorHandler("please provide a full job details", 400));
    }

    if (
      (personalWebsiteTitle && !personalWebsiteUrl) ||
      (!personalWebsiteTitle && personalWebsiteUrl)
    ) {
      return next(
        new ErrorHandler("please provide a personal website and url", 400)
      );
    }

    // console.log("zfgghjkj");

    const postedBy = req.user._id;
    // console.log("zfgghjkj");
    // console.log(postedBy);
    const jobDetails = {
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilities,
      qualifications,
      offers,
      salary,
      hiringMultipleCandidates,
      personalWebsite: {
        title: personalWebsiteTitle,
        url: personalWebsiteUrl,
      },
      jobNiche,
      postedBy,
    };
    // console.log("zfgghjkj", jobDetails);
    // console.log("dfghjkllvb mnkjcvbnjhcvb nbjh :",jobType);

    const job = await Job.create(jobDetails);

    // console.log("dfsgdhfj,mnbmvbxgffhgjk.,nm vcgfhjknmbvghjkm,***");

    // console.log("job:", job);

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log("error posting job : ",error);
    
    return next(new ErrorHandler("error while posting job", 400));
  }
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    const { city, niche, searchKeyword } = req.query;
    const query = {};
    if (city) {
      query.location = city;
    }
    if (niche) {
      query.jobNiche = niche;
    }
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { companyName: { $regex: searchKeyword, $options: "i" } },
        { introduction: { $regex: searchKeyword, $options: "i" } },
      ];
    }
    const jobs = await Job.find(query);
    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
      totalCount: jobs.length,
    });


  } catch (error) {
    return next(new ErrorHandler("error while fetching jobs", 500));
  }
});




export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log("getMyJobs called");
    const myJobs = await Job.find({postedBy:req.user._id});

    // console.log("myJobs", myJobs);
    
    res.status(200).json({
      success: true,
      message: "My jobs fetched successfully",
      myJobs,
      totalCount: myJobs.length,
    })




  } catch (error) {
    return next(new ErrorHandler("error while fetching my jobs", 500));
  }
});


export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  try {
    const {id} = req.params;
    // const job = await Job.findById(id);
    const job = await Job.findByIdAndDelete(id);

    if(!job){
      return next(new ErrorHandler("Oops job not found", 404));
    }
    // await Job.deleteById(job.id);
    
    console.log("Job deleted" , job);
    
    // await Job.deleteOne(job.id);
    // console.log("Job deleted");

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      
    })
  } catch (error) {}
});

// export const deleteJob = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const job = await Job.findByIdAndDelete(id);

//     if (!job) {
//       return next(new ErrorHandler("Oops, job not found", 404));
//     }

//     console.log("Job deleted", job);

//     res.status(200).json({
//       success: true,
//       message: "Job deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error while deleting job:", error); // Log the error for debugging
//     return next(new ErrorHandler("Error while deleting job", 500));
//   }
// });
 


export const getaSingleJob = catchAsyncErrors(async (req, res, next) => {
  try {
    const {id} = req.params;
    const job = await Job.findById(id);
    if(!job){
      return next(new ErrorHandler("Oops job not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    })

  } catch (error) {
    return next(new ErrorHandler("error while getting job", 500));
  }
});
