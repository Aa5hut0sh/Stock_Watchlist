const express = require("express");
const router = express.Router();
const {viewStockController , addStockController} = require("../controllers/watchlist.controller");
const validateWithZod = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get("/view-stock",authMiddleware,viewStockController);
router.post("/add-stock" , authMiddleware,validateWithZod, addStockController);


module.exports = router;