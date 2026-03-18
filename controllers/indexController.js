"use strict";

const controller = {};
const models = require("../models");

controller.showHomepage = async (req, res) => {
  // Products
  const featuredProducts = await models.Product.findAll({
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"], // Chỉ lấy các thuộc tính cụ thể
    order: [["stars", "DESC"]], // Sắp xếp theo starts giảm dần
    limit: 10,
  });
  res.locals.featuredProducts = featuredProducts;

  /** Category */
  const categories = await models.Category.findAll();
  console.log("categoryArray1111===", categories);

  // Chuyển đổi các đối tượng Sequelize thành JSON đơn giản
  const plainCategories = categories.map((category) =>
    category.get({ plain: true }),
  );

  // Tách mảng thành các nhóm
  const secondArray = plainCategories.splice(2, 2);
  const thirdArray = plainCategories.splice(1, 1);

  res.locals.categoryArray = [plainCategories, secondArray, thirdArray];

  // Brand
  const Brand = models.Brand;
  const brands = await Brand.findAll();

  res.render("index", { brands });
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
