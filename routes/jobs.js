const express=require("express");
const router=express.Router();
const jobController=require("../controllers/job");

router.post("/create",jobController.createJobPost);

module.exports=router;