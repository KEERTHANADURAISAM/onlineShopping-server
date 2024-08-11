// import { Router } from "express";
import express from 'express'
import { getAllOrders, getMyOrders, getSingleOrder, orderItem } from "../controller/orderController.js";
const router =express.Router()

// getUserOrder
router.route("/myorders").get( getMyOrders);
//get order by id
router.route("/:id").get( getSingleOrder);
//craete new order
router.route("/").post(orderItem);
//update order
// router.route("/:id/pay").put(protect, updateOrderToPaid);
//get all orders
router.route("/").get( getAllOrders);

export const orderRoute=router;



