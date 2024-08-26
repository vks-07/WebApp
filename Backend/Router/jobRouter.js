import express from 'express';
import {isAuthenticated, isAuthorized} from "../Middleware/auth.js"
import {postJob,deleteJob,getMyJobs,getAllJobs,getaSingleJob} from "../Controller/jobController.js"

const router = express.Router();


router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs",isAuthenticated,isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", isAuthenticated, getaSingleJob);

export default router;
