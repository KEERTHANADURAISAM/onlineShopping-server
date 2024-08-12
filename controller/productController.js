import mongoose from "mongoose";
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
    const sampleData = newProducts.map((product) => {
      if (!product.brand) {
        product.brand = "Default Brand";
        // throw new Error(`Brand is required for product`);
      }
      return { ...product, user: adminUser };
    });
    const sampleDataOne = additionalBooks.map((product) => {
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
  console.log("hello");
  try {
    const products = await Products.find({});
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

// get single product

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid product ID");
  }

  try {
    const getProduct = await Products.findOne({ _id: id });

    if (getProduct) {
      return res.json(getProduct); // This sends the response and exits the function
    } else {
      return res.status(404).json("Product Not Found"); // Proper status code and response
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: error.message });
  }
};

export { getProducts, getSingleProduct, create_Categories };
