import Product from "../models/productSchema"



const getProduct = (async(req,res)=>{
    try{
    const getProducts = Product.find().toArray()
res.status(200).json({getProducts})    
}catch(error){
res.status(500).json({Error:error})
}

})