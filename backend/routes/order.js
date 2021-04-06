const express = require("express");
const router = express.Router();

const { pushOrderInPurchaseList, getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
  makePayment,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, createOrder);

//read
router.get("/order/:userId", isSignedIn, isAuthenticated, getAllOrders);

//status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
router.post("/order/payment/:userId", isSignedIn, isAuthenticated, makePayment);

module.exports = router;
