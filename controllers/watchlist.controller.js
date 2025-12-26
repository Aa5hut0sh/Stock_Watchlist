const User = require("../models/userModel");

const viewStockController = async (req, res, next) => {
  try {

    const user = await User.findById(req.userId).select("watchlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      stocks: user.watchlist,
    });
  } catch (err) {
    next(err);
  }
};

const addStockController = async (req, res, next) => {
  try {
    const { stockName } = req.validatedData;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { watchlist: stockName } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(201).json({ success: true, message: "Stock added successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  viewStockController,
  addStockController,
};
