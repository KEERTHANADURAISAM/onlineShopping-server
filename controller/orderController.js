import Order from "../models/orderSchema.js";

// get all oreders
const getAllOrders =async (req,res)=>{
    try{
    const orders =await Order.find()
    res.status(200).json(orders);
} catch (error) {
  console.log(error)
  res.status(500).json("error")
}
}

// createOrder

const orderItem=async (req,res)=>{
    try{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No Order Found");
        return;
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
    
        const createOrder = await order.save();
        res.status(201).json(createOrder);
      }
    }catch(error){
        res.status(500).json("Internal server Error")
    }
}


// orderById

const getSingleOrder = async (req,res)=>{
    try{
const order = await Order.findById(req.params.id).populate("user","name email");
if(order){
res.status(200).json(order)
}
    }catch (error) {
  console.log(error)
  res.status(500).json("error")
    }
}

// getMyorders

const getMyOrders = (async (req, res) => {
    try{
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
    }
catch (error) {
    console.log(error)
    res.status(500).json("error")
      }
    })

  export {getAllOrders,orderItem,getSingleOrder,getMyOrders}