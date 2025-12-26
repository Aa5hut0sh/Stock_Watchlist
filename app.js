require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const watchlistRouter = require("./routes/watchlist.routes");
const authRouter = require("./routes/auth.routes");
app.use(express.json());

const dbUrl = process.env.DBURL || "mongodb://127.0.0.1:27017/test";
main()
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

app.use("/api/watchlist", watchlistRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`app is listening to port ${PORT}`);
});
