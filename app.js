const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());

//Router
const tourRoute = require('./routes/tour.route');




app.get("/", (req, res) => {
  res.send("router is working! YaY!");
});

// posting to database
app.use("/api/v1/tour", tourRoute);
module.exports = app;
