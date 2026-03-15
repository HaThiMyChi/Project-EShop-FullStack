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
app.use("/", require("./routes/indexRouter"));

// Khởi động web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
