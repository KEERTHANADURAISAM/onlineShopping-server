import express from "express";
import { create_Categories, getProducts, getSingleProduct } from "../controller/productController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products").get(getSingleProduct);
router.route('/createproducts').post(create_Categories)


export const productRoute = router;
