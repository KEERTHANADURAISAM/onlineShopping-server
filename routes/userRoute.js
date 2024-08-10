import { loginUser, registerUser } from "../controller/userController.js";
import express  from "express";
const router=express.Router()

// user register
router.route("/register").post(registerUser)
router.route("/signin").post(loginUser)



export const userRoutes = router;