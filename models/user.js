const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
},{ timestamps:{createdAt:"createdAt",updatedAT:"updatedAt"} }
);
module.exports=mongoose.model("user",userSchema);