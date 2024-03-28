const express=require("express");
const router=express.Router();
const jobController=require("../controllers/job");
const verifyToken = require("../middlewares/verifyToken");


router.post("/create",verifyToken,jobController.createJobPost);//protected
router.get("/job-details/:jobId",jobController.getJobDetailsById); //public
router.put("/update/:jobId", verifyToken, jobController.updateJobDetailsById); //public
router.get("/all",jobController.getAllJobs);



module.exports=router;