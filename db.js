import mongoose from "mongoose";

// db connection
export async function mongoConnect(){
   const connectionParams ={
    useNewUrlParsar:true,
    useUnifiedTopology:true,
   };
   try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Mongo")
   }catch(error){
    console.log(error);
   }
}