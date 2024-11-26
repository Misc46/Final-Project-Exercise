const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/product.model.js");
// const productRoute = require("./routes/product.route.js");
const userRoute = require("./Routes/User.route.js");
const postRoute = require("./Routes/book.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// routes
// app.use("/api/products", productRoute);
app.use("/users", userRoute); // this uses query
app.use("/item/", postRoute); // this uses body



app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});


mongoose
  .connect(
    "#DATABASE CONNECT"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
