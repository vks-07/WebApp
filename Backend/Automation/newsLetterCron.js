// import cron from "node-cron";
// import { Job } from "../Models/jobSchema.js";
// import { User } from "../Models/userSchema.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import ErrorHandler from "../Middleware/error.js";
// // cron is used for cron sheduling
// export const newsLetterCron = () => {
//   cron.schedule("*/1 * * * *", async () => {
//     // minutes hours days month weekdays
//     console.log("Running News Letter Cron Atutomation");
//     const jobs = await Job.find({ newsLetterSent: false });
//     for (const job of jobs) {
      
//       try {
//         const filterUser = User.find({
//           $or: [
//             { "niches.firstNiche": job.firstNiche },
//             { "niches.secondNiche": job.secondNiche },
//             { "niches.thirdNiche": job.thirdNiche },
//           ],
//         });
//         for (const user of filterUser) {
//           const subject = `Hot Job alert ${job.title} in ${job.jobNiche} Available Now`;
//           const message = `Hi ${user.name},\n \n Greate news! A new job that fits your niche 
//           has just been posted . The position is for ${job.title}  with ${job.companyName}, 
//           ans they are lookin to hire immediately, \n\nJob details  :\n
//           -**Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}
//           \n- **Salary:** ${job.salary}\n\n Don't wait too long! Job openings like these 
//           are filled quickly. \n\n We're here to suport tou in your job search. Best of luck \n\n
//           Best Regards,\nNicheNest Team`;
//           await sendEmail({ user: user.email, subject, message });
//         }

//         job.newsLetterSent = true;
//         await job.save();
//       } catch (error) {
//         console.log("error while sending mail");
//         return next(new ErrorHandler("error while sending mail", 400));
//       }
//     }
//   });
// };


import cron from "node-cron";
import { Job } from "../Models/jobSchema.js";
import { User } from "../Models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

// cron is used for cron scheduling
export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    // minutes hours days month weekdays
    console.log("Running Newsletter Cron Automation");
    
    try {
      const jobs = await Job.find({ newsLetterSent: false });

      for (const job of jobs) {
        const filterUser = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        console.log("filter User ",filterUser);
        
        for (const user of filterUser) {
          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted.\nThe position is for ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon't wait too long! Job openings like these are filled quickly.\n\nWe're here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`;
          console.log("ghsdcfjhadsbhcjkdsjkc : ",user.email);
          
          await sendEmail({ email: user.email, subject, message });
        }

        job.newsLetterSent = true;
        await job.save();
        
      }
      console.log("completed job");

    } catch (error) {
      console.log("Error while sending mail:", error);
    }
  });
};
