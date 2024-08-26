import express from 'express';
const router = express.Router()
import {isAuthenticated, isAuthorized} from "../Middleware/auth.js"
import { deleteApplication, employerGetAllApplication, jobSeekerGetAllApplication, postApplication } from '../Controller/ApplicationController.js';

router.post("/post/:id", isAuthenticated, isAuthorized("Job Seeker"),postApplication);
router.get("/employer/getall", isAuthenticated, isAuthorized("Employer"),employerGetAllApplication);
router.get("/jobseeker/getall", isAuthenticated, isAuthorized("Job Seeker"),jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication)

export default router;