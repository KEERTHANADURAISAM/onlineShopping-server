import express from "express"
import { userRoutes } from "./routes/userRoute.js";
import { mongoConnect } from "./db.js";
import dotenv from 'dotenv'
import {  productRoute } from "./routes/productRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import cors from "cors"



dotenv.config()
// denote express
const app =express();
// config express
app.use(express.json())
// port
const port =process.env. PORT || 3008;

// db connection
mongoConnect();

// cors
app.use(cors());


// initial api 
app.get('/', (req,res)=>{
    res.send("welcome")
})

// api requests
app.use("/api/user", userRoutes);
app.use("/api/products",productRoute)

app.use("/api/orders",orderRoute);


// app listening with port
app.listen(port,()=>{
console.log(`Running ${port}`)})