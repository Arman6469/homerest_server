const router = require("express").Router();
const ShopItem = require("../models/shop_item_model");

router.get("/", async (req, res) => {
  try {
    const data = await ShopItem.find();
    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.post("/item/add", async (req, res) => {
  try {
    const item = new ShopItem({
      title: req.body.title,
      icon: req.body.icon,
      category: req.body.category,
      all: req.body.all,
      products: req.body.products,
    });
    await item.save();
    res.send({ message: "Item has successfuly added", item: item });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.delete("/item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await ShopItem.findByIdAndDelete(id);
    res.send({ message: "Item has successfuly deleted", item: item });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.delete("/item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await ShopItem.findByIdAndUpdate(id, req.body);
    res.send({ message: "Item has successfuly updated", item: item });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});


module.exports = router