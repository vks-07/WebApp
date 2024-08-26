import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT, // Corrected the port setting
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(options);
    console.log("Mail sent successfully");

  } catch (error) {
    console.error("Couldn't send mail:", error);
    // If this is being used in an Express middleware, uncomment the following line:
    // return next(new ErrorHandler("Couldn't send mail", 400));
  }
};
