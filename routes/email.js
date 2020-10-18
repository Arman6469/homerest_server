const router = require("express").Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const myEnv = dotenv.config().parsed;

const validateHuman = async (token) => {
  const secret = "6LdVtNQZAAAAAKwPi-M_4p1Epd0B8KbUGYeTPVJx";
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    console.log(data);

    return data.success;
  } catch (error) {
    console.log(error);
  }
};

router.post("/sendmail", async (req, res) => {
  let human = await validateHuman(req.fields.token);

  if (!human) {
    res.send({ error: "Աչքիս դուք ռոբոտ եք🤨🤖" });
    return;
  }
  const productsToMail =
    Object.entries(req.fields).length > 0
      ? req.fields.products.map((product) => {
          return `<div style='width: 80% !important, display: flex, flex-direction: column, align-items: center'> <img src=${product.images[0]} width="100%" /> <p>Դուք գնել եք ${product.count} հատ ${product.title}, արժեքը՝ ${product.totalPrice}$</p></div>`;
        })
      : null;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "homerest.furniture@gmail.com",
      pass: "arm_art_033",
    },
  });

  let mailOptions = {
    service: "gmail",
    from: "homerest@homerest.am",
    to: ["homerest.furniture@gmail.com", req.fields.email],
    subject: "Շնորհակալություն գնումների համար, սիրով HomeRest",
    html: `<div style="display: flex"><p>Պատվիրատուի անունը ։ </p><p> ${
      req.fields.firstname
    }</p></div>
      <div style="display: flex"><p>Ազգանունը ։ </p><p> ${
        req.fields.lastname
      }</p></div>
      <div style="display: flex"><p>Էլեկտրոնային հասցեն ։ </p><p> ${
        req.fields.email
      }</p></div>
      <div style="display: flex"><p>Հեռախոսահամարը ։ </p><p> ${
        req.fields.phone
      }</p></div>
      <div style="display: flex"><p>Հասցեն ։ </p><p> ${
        req.fields.adress
      }</p></div>
        ${productsToMail.join(" ")}
         `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send({
    message:
      "Ձեր գնումները հաջողությամբ կատարվել են🤩, մենք կկապնվենք Ձեզ հետ ապրանքի առաքման օրը պայմանավորվելու համար😊",
  });
});

router.post("/contactmail", async (req, res) => {
  let human = await validateHuman(req.fields.token);

  if (!human) {
    res.send({ error: "Աչքիս դուք ռոբոտ եք🤨🤖" });
    return;
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "homerest.furniture@gmail.com",
      pass: "arm_art_033",
    },
  });

  let mailOptions = {
    service: "gmail",
    from: "homerest@homerest.am",
    to: [req.fields.email],
    subject: "Հաճախորդի հարց",
    html: `<div style="display: flex"><p>Հաճախորդի անունը ։ </p><p> ${req.fields.firstname}</p></div>
      <div style="display: flex"><p>Ազգանունը ։ </p><p> ${req.fields.lastname}</p></div>
      <div style="display: flex"><p>Էլեկտրոնային հասցեն ։ </p><p> ${req.fields.email}</p></div>
      <div style="display: flex"><p>Հարցը ։ </p><p> ${req.fields.text}</p></div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send({
    message:
      "Ձեր նամակը հաջողությամբ ուղարկվել է🤩, մենք կկապնվենք Ձեզ հետ հնարավորինս շուտ😊",
  });
});

module.exports = router;
