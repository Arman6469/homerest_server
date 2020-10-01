const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const ShopItem = new Schema({
  title: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  red_icon: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  white_icon: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  category: {
    type: String,
    max: 100,
    min: 2,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  all: [{ alltype: String }],
  products: [
    {
      furtype: String,
    },
  ],
});

module.exports = mongoose.model("ShopItem", ShopItem);
