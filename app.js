const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/authenticationRoutes");
var app = express();
const port = 3000;
app.listen(port, function () {
  console.log(`Server Running on PORT ${port}`);
});
app.use(express.json());
app.use("/api", router);

//Connection with Database - MongoDB
mongoose
  .connect(
    "mongodb+srv://mahobiashubham4:gdd4IS1aYdia6Qxg@cluster0.ekmqeo8.mongodb.net/nirogBharat?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Mongo Connection Error " + err));

