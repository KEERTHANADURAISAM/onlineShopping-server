import { users } from "../data/user";
import Products from "../models/productSchema";
import User from "../models/userSchema";

// create categerious
const create_Categories = async (req, res) => {
  try {
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = Products.map((product) => {
      return { ...product, user: adminUser };
    });
    const thinks = await Products.insertMany(sampleData);
    res.status(200).json("created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get products
const getProducts = async (req, res) => {
  try {
    const getProducts = Products.find({});
    res.status(200).json({ getProducts });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

// get single product

const getSingleProduct = async (req, res) => {
  try {
    const getProduct = await Products.findOne(req.params.id);
    if (getProduct) {
      return res.json(getProduct);
    } else {
      res.json(404).json("User Not Found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export { getProducts, getSingleProduct };
