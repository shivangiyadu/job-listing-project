const User=require("../models/user");
const bcrypt=require("bcrypt");

const registerUser=async(req,res)=>{
    try{
        const {name , password , email , mobile}=req.body;
        if(!name ||  !email || !password || !mobile){
            return res.status(400).json({
               errorMessage:"Bad Request", 
            });
        }
        const IsexistingUser= await User.findOne({email:email});
        if (IsexistingUser)
        {
            return res
                    .status(409)
                    .josn({errorMessage:"User already exits"});
        }

    const hashedPassword=await bcrypt.hash(password,10);
        const userData=new User({
            name,
            email,
            password:hashedPassword,
            mobile,
        });
        await userData.save();
        res.json({message:"User registered successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({errorMessage:"Something went wrong"});
    }
};
const loginUser=async(req,res)=>{
    try{
        const{email , password}=req.body;
        if(!email|| !password){
            return res.status(400).json({
                errorMessage:"Bad Request Invalid credentials",
            });
        }
         const userDetails=await User.findOne({email});
         if(!userDetails){
            return res
            .status(401)
            .josn({errorMessage:"Invalid Credentials "});

         }
         const passwordMatch=await bcrypt.compare(
            password,
            userDetails.password
         );
         if(!passwordMatch)
         {
            return res 
                     .status(401)
                     .json({errorMessage:"INvalid Credentials"})
         }
         res.json({message:"User Logged in" })



    }
    catch(error)
    {
        console.log(error)
       res.status(500).json({errorMessage:"Something went wrong !"})
    }
}

module.exports={registerUser,loginUser};