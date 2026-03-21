let controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  // console.log("req.originalUrl =", req.originalUrl);
  // console.log("req.url =", req.url);
  // console.log("req.query =", req.query);
  // console.log("req.query.category =", req.query.category);

  // Dung isNaN co phai la so hay khong, neu khong phai so thi tra ve 0, neu la so thi tra ve so do

  let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  let brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
  let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);

  let categories = await models.Category.findAll({
    include: [{ model: models.Product }], // muốn lấy thêm 1 categories có những sản phẩm nào, vì trong bảng product có khóa ngoại categoryId nên có thể lấy được những sản phẩm nào thuộc về category đó, nếu không có thì sẽ không lấy được
  });
  res.locals.categories = categories;

  let brands = await models.Brand.findAll({
    include: [{ model: models.Product }],
  });
  // truyen brands nay len view
  res.locals.brands = brands;

  let tags = await models.Tag.findAll();
  res.locals.tags = tags;

  let options = {
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: {},
  };

  if (category > 0) {
    options.where.categoryId = category;
  }

  if (brand > 0) {
    options.where.brandId = brand;
  }

  if (tag > 0) {
    options.include = [
      {
        model: models.Tag,
        where: { id: tag }, // lấy ra những sản phẩm nào nó có id = giá trị tag người dùng chọn
      },
    ];
  }

  let products = await models.Product.findAll(options);

  res.locals.products = products;
  res.render("product-list");
};

module.exports = controller;

// (mối quan hệ nhiều nhiều) một sản phẩm thì có nhiều tag, một tag thì có nhiều sản phẩm,
// nên sẽ có bảng trung gian product_tags để lưu trữ mối quan hệ này, trong bảng product_tags sẽ có 2 khóa ngoại là productId và tagId,
// khi muốn lấy ra những tag nào thuộc về sản phẩm nào thì sẽ phải join 3 bảng lại với nhau, còn nếu muốn lấy ra những sản phẩm nào thuộc về tag nào thì cũng phải join 3 bảng lại với nhau
