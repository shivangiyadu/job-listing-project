require("dotenv").config();
console.log(process.DATABASE_URL);
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const jobRoute=require("./routes/jobs");

const express=require("express");

const app=express();
app.use(express.json());


mongoose
       .connect(process.env.DATABASE_URL)
       .then(()=>console.log("DB CONNECTED"))
       .catch((error)=>console.log("DB FAILED TO CONNECT",error));

app.get("/api/health",(req,res)=>{
    console.log("Heyy shivangi");
    res.json({
        service:"Backend Joblisting server",
        status:"active",
        time:new Date(),
    });
})


//it is here to initialise and tell the server the server,js file that see i have h auth.js file and have all the routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/job",jobRoute);

const PORT=3003;


app.listen(3003,()=>{
    console.log(`Backend server running at port ${PORT}`);

});