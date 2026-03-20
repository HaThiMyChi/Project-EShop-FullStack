let controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  // console.log("req.originalUrl =", req.originalUrl);
  // console.log("req.url =", req.url);
  // console.log("req.query =", req.query);
  // console.log("req.query.category =", req.query.category);

  let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);

  let categories = await models.Category.findAll({
    include: [{ model: models.Product }], // muốn lấy thêm 1 categories có những sản phẩm nào, vì trong bảng product có khóa ngoại categoryId nên có thể lấy được những sản phẩm nào thuộc về category đó, nếu không có thì sẽ không lấy được
  });
  res.locals.categories = categories;

  let options = {
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: {},
  };

  if (category > 0) {
    options.where.categoryId = category;
  }

  let products = await models.Product.findAll(options);

  res.locals.products = products;
  res.render("product-list");
};

module.exports = controller;
