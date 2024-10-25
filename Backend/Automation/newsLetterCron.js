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
    // console.log("Running Newsletter Cron Automation");

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
        console.log("filter User ", filterUser);

        // for (const user of filterUser) {
        //   const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
        //   const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been posted.\nThe position is for ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon't wait too long! Job openings like these are filled quickly.\n\nWe're here to support you in your job search. Best of luck!\n\nBest Regards,\n\nJobInfinity Team`;
        //   console.log("ghsdcfjhadsbhcjkdsjkc : ",user.email);

        //   await sendEmail({ email: user.email, subject, message });
        // }
        // console.log("ID: ", job.id);
        // console.log("IDksc: ", job._id);

        for (const user of filterUser) {
          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `
            <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/chai-or-code/image/upload/v1724740409/logo_mcistt.png" alt="JobInfinity Logo" style="max-width: 150px; margin-bottom: 20px;" />
      </div>
      <h2 style="color: #333333; text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Hot Job Alert!</h2>
      <p style="color: #555555; font-size: 16px; margin-bottom: 10px;">Hi ${user.name},</p>
      <p style="color: #555555; font-size: 16px; margin-bottom: 20px;">Great news! A new job that fits your niche has just been posted.</p>
      <p style="color: #555555; font-size: 16px; margin-bottom: 20px;">The position is for <strong>${job.title}</strong> with <strong>${job.companyName}</strong>, and they are looking to hire immediately.</p>
      <p style="color: #555555; font-size: 16px; font-weight: bold; margin-bottom: 10px;">Job details:</p>
      <ul style="color: #555555; font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
        <li style="margin-bottom: 5px;"><strong>Position:</strong> ${job.title}</li>
        <li style="margin-bottom: 5px;"><strong>Company:</strong> ${job.companyName}</li>
        <li style="margin-bottom: 5px;"><strong>Location:</strong> ${job.location}</li>
        <li style="margin-bottom: 5px;"><strong>Salary:</strong> ${job.salary}</li>
      </ul>
      <p style="color: #555555; font-size: 16px; margin-bottom: 20px;">Don't wait too long! Job openings like these are filled quickly.</p>
      <p style="text-align: center; margin: 20px 0;">
<a href="http://localhost:5173/post/application/${job.id}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">View Job Listings</a>
      </p>
      <p style="color: #555555; font-size: 16px; margin-bottom: 10px;">We're here to support you in your job search. Best of luck!</p>
      <p style="color: #333333; font-size: 16px; font-weight: bold; margin-bottom: 5px;">Best Regards,</p>
      <p style="color: #333333; font-size: 16px; font-weight: bold;">JobInfinity Team</p>
    </div>
  </body>
</html>



          `;

          console.log("Sending email to: ", user.email);

          await sendEmail({ email: user.email, subject, message });
        }

        job.newsLetterSent = true;
        await job.save();
      }
      // console.log("completed job");
    } catch (error) {
      console.log("Error while sending mail:", error);
    }
  });
};
