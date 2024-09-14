const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

var cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();



app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/static", express.static(__dirname + "/uploads"));


const dev = async () => {
  try {
    await mongoose.connect(
      `mongodb://localhost:27017/`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

dev();