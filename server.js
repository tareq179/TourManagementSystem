const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require('colors');

const app = require('./app');

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log(`DataBase connection is successful`.red.bold)
})

//server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
