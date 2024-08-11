import express from "express";
import { create_Categories, getProducts, getSingleProduct } from "../controller/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route('/createproducts').post(create_Categories)


export const productRoute = router;
