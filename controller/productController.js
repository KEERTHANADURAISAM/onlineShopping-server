import { additionalBooks } from "../data/books.js";
import { newProducts } from "../data/products.js";
import { users } from "../data/user.js";
import Products from "../models/productSchema.js";
import User from "../models/userSchema.js";

// create categerious
const create_Categories = async (req, res) => {
  try {
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData =newProducts.map((product) => {
        if (!product.brand) {
            throw new Error(`Brand is required for product`);
          }
      return { ...product, user: adminUser };
    });
    const sampleDataOne=additionalBooks.map((product) => {
        if (!product.brand) {
            product.brand = "Default Brand";
          }
        return { ...product, user: adminUser };
      });
      
    const thinks = await Products.insertMany(sampleData);
    // const thinksOne=await Products.insertMany(sampleDataOne);
    res.status(200).json("created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get products
const getProducts = async (req, res) => {
  try {
    const getProducts = Products.find().lean();
    res.status(200).json({ getProducts });
  
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: error });
  }
};

// get single product

const getSingleProduct = async (req, res) => {
  try {
    const productId =req.params.id
    const getProduct = await Products.findOne({_id:productId});
    if (getProduct) {
      return res.json(getProduct);
    } else {
      res.json(404).json("User Not Found");
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: error });
  }
};

export { getProducts, getSingleProduct,create_Categories };
