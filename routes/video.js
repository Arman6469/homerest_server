const router = require("express").Router();
const Video = require("../models/video_model");
const { route } = require("./products");

router.get("/", async (req, res) => {
  try {
    const data = await Video.find();

    res.send(data);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong !" });
  }
});

router.post("/add", async (req, res) => {
  const newVideo = new Video({ url: req.body.url });
  try {
    await newVideo.save();
    res.status(200).send({ message: "Video has successfuly added" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong !" });
  }
});

router.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Video.findByIdAndUpdate(id);
    res.status(200).send({ message: "Video has successfuly edited" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Video.findByIdAndDelete(id);
    res.status(200).send({ message: "Video has successfuly deleted" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
});

module.exports = router;
