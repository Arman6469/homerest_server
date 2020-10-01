const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const Product = new Schema({
  title: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    max: 100,
    min: 2,
  },
  newprice: {
    required: false,
    type: Number,
    default: function () {
      return this.sale !== 0
        ? Math.ceil(this.price - (this.price * this.sale) / 100)
        : 0;
    },
  },
  description: {
    type: String,
    required: true,
    max: 2000,
    min: 2,
  },
});

module.exports = mongooose.model("product", Product);
