import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1m" });
};

// registerUser
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExsit = { email };
    // make salt and hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    // create User
    const user = await User.create({ name, email,password: hashPassword });
    // console.log(user);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token: generateToken(user._id),
      });
    }
    if (userExsit) {
      res.status(400).json({ message: "User email already taken" });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

// loginUser


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

   return res.json({user,token})
  }
    catch(error){
      res.status(500).json({Error:error})
    }

  }

export { registerUser, loginUser };
