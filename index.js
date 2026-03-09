"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// cau hinh public static folder
app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.send("Hello to EShop");
// });

// Khởi động web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
