const router = require("express").Router();
const Product = require("../models/product_model");


router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findById(id);
    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.get("/sale", async (req, res) => {
  try {
    const data = await Product.find().sort("sale");
    data.reverse();       
    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});
router.post("/product/add", async (req, res) => {
  const product = new Product({
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    sale: 14,
    images: req.body.images,
    category: req.body.category,
    price: req.body.price,
  });
  try {
    await product.save();
    res.send({ message: "Product has succesfuly added" });
    console.log(product);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndDelete(id);
    res.send({ message: "Product has deleted", data: data });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.patch("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByIdAndUpdate(id, req.body);
    res.send({ message: "Product has updated", data: data });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});


  

module.exports = router;
