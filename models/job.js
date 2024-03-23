const mongoose=require("mongoose");

const jobSchema=new mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        logoUrl:{
            type:String,
            required:true,
        },
        salary:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            required:true,
        },
        duration:{
            type:String,
            required:true,
        },
        locationType:{
            type:Array,
            required:true,
        },
        skills:{
            type:Array,
            requierd:true,
        },
        refUserId: {
            type: mongoose.Schema.Types.ObjectId, // Correct type definition for referencing another document
        },
    },
    {timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}}
);
module.exports=mongoose.model("Job",jobSchema);