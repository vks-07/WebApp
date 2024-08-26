import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DbConnect } from "./Database/connection.js";
import { errorMiddleware } from "./Middleware/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./Router/userRoutes.js"
import jobRouter from "./Router/jobRouter.js"
import applicationRouter from "./Router/applicationRouter.js"
import { newsLetterCron } from "./Automation/newsLetterCron.js";

config({ path: "./config/config.env" });
const app = express();


app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// to access token
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application", applicationRouter);


newsLetterCron();
DbConnect();


app.use(errorMiddleware);

export default app;
