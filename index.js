import express from "express"
import { userRoutes } from "./routes/userRoute.js";
import { mongoConnect } from "./db.js";
import dotenv from 'dotenv'
dotenv.config()
// denote express
const app =express();
// config express
app.use(express.json())
// port
const port =process.env. PORT || 3008;

// db connection
mongoConnect();



// initial api 
app.get('/', (req,res)=>{
    res.send("welcome")
})

// api requests
app.use("/api/user", userRoutes);




// app listening with port
app.listen(port,()=>{
console.log(`Running ${port}`)})