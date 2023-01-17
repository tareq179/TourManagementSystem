const mongoose = require('mongoose')
// schema design
const tourSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true
    },
    duration: {
        type: String,
        required: true,
        enum: {
            values: ["hour", "day", "week"],
            message: "unit value can't be {VALUE}, must be hour/day/week"
        }
    },
    price: {
      type: Number,
      rquired: true,
      min: [0, "Price can't be negative"],
    },
    location: [{
          address: {
            type: String,
            required: true
      }
    }]
  }, {
    timestamps: true,
  })
  
  
  tourSchema.methods.logger= function(){
    console.log(` Data saved for ${this.name}`);
  }
  
  
  // SCHEMA -> MODEL -> QUERY
  
  const Tour = mongoose.model('Product', tourSchema)

  module.exports = Tour;