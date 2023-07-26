const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/router");

const app = express();

//database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

//routes
app.use(express.json());
app.use("/api", userRouter);

//port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
