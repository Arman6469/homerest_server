const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const adminRoute = require("./routes/admin.router");
const emailRoute = require("./routes/email");
const shopItemRoutes = require("./routes/shopitems");
const mongoose = require("mongoose");
const helmet = require("helmet");

const formidableMiddleware = require("express-formidable");
const port = process.env.PORT || 8000;

mongoose.connect(
  "mongodb+srv://joker:098a80b67c@cluster0.4lmz3.mongodb.net/<homerest>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Mongo connected")
);
mongoose.set("useFindAndModify", false);

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(formidableMiddleware());

app.use("/products", productRoutes);
app.use("/admin", adminRoute);
app.use("/email", emailRoute);
app.use("/shopitems", shopItemRoutes);
app.listen(port, () => console.log(`Server is running on port ${port}`));
