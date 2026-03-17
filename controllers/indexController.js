"use strict";

const controller = {};
const models = require("../models");

controller.showHomepage = async (req, res) => {
  const Brand = models.Brand;
  const brands = await Brand.findAll();
  console.log("brands===", brands);

  res.render("index", { brands }); // nếu object có key và value giống nhau thì có thể viết tắt thành 1 từ { brands: brands }
};

controller.showPage = (req, res, next) => {
  const pages = [
    "cart",
    "checkout",
    "contact",
    "login",
    "my-account",
    "product-detail",
    "product-list",
    "wishlist",
  ];
  if (pages.includes(req.params.page)) return res.render(req.params.page);
  next();
};

module.exports = controller;
