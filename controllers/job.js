const Job=require("../models/job");
const createJobPost=async(req,res)=>{
    try{
        const{
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            locationType,
            skills,
        }=req.body

        if(!companyName ||
            !logoUrl||
            !title||
            !description||
            !salary||
            !location||
            !duration||
            !locationType||
            !skills
            )
            {
                return res.status(400).json({
                    errorMessage:"Bad Request",
                });
            }
            const jobDeatils=new Job({
                companyName,
                logoUrl,
                title,
                description,
                salary,
                location,
                duration,
                locationType,
                skills,

            });
            await jobDeatils.save();
            res.json({message:"Job created Succesfully"});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({errrorMessage:"Something went wrong"});
        
    }
}
module.exports={createJobPost};