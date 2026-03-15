"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require("express-handlebars");
const { partials } = require("handlebars");

// cau hinh public static folder
app.use(express.static(__dirname + "/public"));

// cau hinh su dung express-handlebars
app.engine(
  "hbs",
  expressHandlebars.engine({
    layoursDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials", // chứa layout con
    extname: "hbs",
    defaultLayout: "layout",
  }),
);
app.set("view engine", "hbs");

// routes
app.get("/createTables", (req, res) => {
  let models = require("./models");
  models.sequelize.sync().then(() => {
    res.send("Tables created successfully!");
  });
});

app.get("/", (req, res) => {
  res.render("index"); // nó lây nội dung trong file index.hbs này đổ vào trang layout.hbs
});

app.get("/:page", (req, res) => {
  res.render(req.params.page);
});

// Khởi động web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
