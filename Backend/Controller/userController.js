import { catchAsyncErrors } from "../Middleware/cacheAsyncError.js";
import ErrorHandler from "../Middleware/error.js";
import { User } from "../Models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler("Please provide your preferred niches", 400)
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email is already registered", 400));
    }

    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };

    if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "Job_Seekers_Resume" }
          );

          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler("Failed to upload resume to cloud", 500)
            );
          }

          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
          return next(new ErrorHandler("Failed to upload resume", 500));
        }
      }
    }

    const user = await User.create(userData);
    console.log("user : ", user);

    sendToken(user, 201, res, "User registered");

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("fchjkdsdbdfhngf");
    
    const { role, email, password } = req.body;
    console.log("dfghjk");

    console.log(role, email, password);

    if (!role || !email || !password) {
      return next(
        new ErrorHandler("Email, password and role are required", 400)
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid user and password", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid user and password", 400));
    }
    console.log(user);

    if (user.role !== role) {
      return next(new ErrorHandler("Invalid role", 400));
    }

    console.log(user.role);
    console.log(role);

    // if(user.role != role){
    //   return next(
    //     new ErrorHandler("user role not matched", 400)
    //   )
    // }
    sendToken(user, 200, res, "User logged in successfully");
  } catch (error) {
    return next(new ErrorHandler("error while login", 400));
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Logout");

    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged out Successfully",
      });
  } catch (error) {
    return next(new ErrorHandler("error while logout", 400));
  }
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler("Error while getting user", 400));
  }
});

// export const updateProfile = catchAsyncErrors(async (req, res, next) => {
//   try {
//     console.log("update profile")
//     const newUserData = {
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//       address: req.body.address,
//       coverLetter: req.body.coverLetter,
//       niches: {
//         firstNiche: req.body.firstNiche,
//         secondNiche: req.body.secondNiche,
//         thirdNiche: req.body.thirdNiche,
//       },
//     };

//     const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
//     console.log("fetched new user data");

//     if (
//       req.user.role === "Job Seeker" &&
//       !firstNiche &&
//       !secondNiche &&
//       !thirdNiche
//     ) {
//       return next(
//         new ErrorHandler("Please provide yuor all prefered niches", 400)
//       );
//     }
//     console.log("checking first");
//     console.log(req.files);

//     if (req.files) {
//       const resume = req.files.resume;

//       if (resume) {
//         const currentResumeId = req.user.resume.public_id;
//         console.log(currentResumeId);

//       console.log("jsr");

//         if (currentResumeId) {
//           await cloudinary.uploader.destroy(currentResumeId);
//         }
//         const newresume = await cloudinary.uploader.upload(
//           resume.tempFilePath,
//           {
//             folder: "Job_Seekers_Resume",
//           }
//         );
//         newUserData.resume = {
//           public_id: newresume.public_id,
//           url: newresume.secure_url,
//         };
//       }

//       console.log("finding user...");

//       const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       })

//       return res.status(200).json({
//         success: true,
//         message: "Profile updated successfully",
//         user,
//       })

//     console.log(user);

//     }
//   } catch (error) {
//     return next(new ErrorHandler("Error while updating profile", 400));
//   }
// });

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Updating profile");
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      coverLetter: req.body.coverLetter,
      niches: {
        firstNiche: req.body.firstNiche,
        secondNiche: req.body.secondNiche,
        thirdNiche: req.body.thirdNiche,
      },
    };

    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;
    console.log("Fetched new user data");

    if (
      req.user.role === "Job Seeker" &&
      !firstNiche &&
      !secondNiche &&
      !thirdNiche
    ) {
      return next(
        new ErrorHandler("Please provide all your preferred niches", 400)
      );
    }
    console.log("Checking if files are uploaded");
    console.log(req.files);

    if (req.files && req.files.resume) {
      const resume = req.files.resume;

      const currentResumeId = req.user.resume
        ? req.user.resume.public_id
        : null;
      console.log("Current Resume ID:", currentResumeId);

      if (currentResumeId) {
        try {
          await cloudinary.uploader.destroy(currentResumeId);
        } catch (error) {
          return next(new ErrorHandler("Error deleting current resume", 500));
        }
      }

      try {
        const newResume = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "Job_Seekers_Resume",
          }
        );
        newUserData.resume = {
          public_id: newResume.public_id,
          url: newResume.secure_url,
        };
      } catch (error) {
        return next(new ErrorHandler("Error uploading new resume", 500));
      }
    }

    console.log("Finding and updating user...");

    try {
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      console.log("User updated:", user);

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("Error updating user profile", 500));
    }
  } catch (error) {
    return next(new ErrorHandler("Error while updating profile", 500));
  }
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Updating password");
    
    const user = await User.findById(req.user.id).select("password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Old Password", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res, "Password updated successfully");


  } catch (error) {

    return next(new ErrorHandler("Error while updating password", 500));
  }
});
