import express  from "express";
import { getProducts, getSingleProduct } from "../controller/productController";



const router=express.Router()


router.route("/products").get(getProducts)
router.route("/product").get(getSingleProduct)


export const productRoute =router;