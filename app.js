const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/product.model.js");
// const productRoute = require("./routes/product.route.js");
const userRoute = require("./Routes/user.route.js");
const postRoute = require("./Routes/book.route.js");
const app = express();
require('dotenv').config()
const uri = process.env.URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const cors = require("cors");

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


async function run() {
  await mongoose.connect("mongodb+srv://erechoum:3xK.ytvbZxxPmpG@cluster0.ou8vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  app.listen(3000,()=>{
    console.log("Listening on port 3000");
  })

}
run().catch(console.dir);