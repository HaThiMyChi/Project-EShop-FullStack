let controller = {};
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

controller.getData = async (req, res, next) => {
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

  next(); // lệnh next() này sẽ chuyển sang controller tiếp theo để xử lý, nếu không có lệnh next() này thì sẽ không chuyển sang controller tiếp theo được, mà sẽ dừng lại ở controller này và trả về kết quả cho client luôn
};

controller.show = async (req, res) => {
  // console.log("req.originalUrl =", req.originalUrl);
  // console.log("req.url =", req.url);
  // console.log("req.query =", req.query);
  // console.log("req.query.category =", req.query.category);

  // Dung isNaN co phai la so hay khong, neu khong phai so thi tra ve 0, neu la so thi tra ve so do

  let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  let brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
  let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);

  let keyword = req.query.keyword || "";
  let sort = ["price", "newest", "popular"].includes(req.query.sort)
    ? req.query.sort
    : "price";

  // chuc nang phan trang
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);

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

  if (keyword.trim() != "") {
    options.where.name = { [Op.iLike]: `%${keyword}%` }; // lấy ra những sản phẩm nào có tên chứa chuỗi keyword người dùng nhập vào, % là ký tự đại diện cho bất kỳ chuỗi nào, nếu muốn tìm kiếm chính xác thì không cần dùng % mà chỉ cần gán giá trị keyword vào name thôi
  }
  // Dấu % nó giống như trong SQL
  // select * from products where name like '%keyword%' => lấy ra những sản phẩm nào có tên chứa chuỗi keyword, nếu muốn tìm kiếm chính xác thì chỉ cần gán giá trị keyword vào name thôi, không cần dùng % nữa

  // chuc nang sort
  switch (sort) {
    case "newest":
      options.order = [["createdAt", "DESC"]];
      break;
    case "popular":
      options.order = [["stars", "DESC"]]; // từ cao đến thấp
      break;
    default:
      options.order = [["price", "ASC"]]; // thấp đến cao
  }

  console.log("originalUrl", req.originalUrl);
  // res.locals.originalUrl = req.originalUrl;
  res.locals.sort = sort;
  // tạo các link sort sạch, không bị lặp sort
  res.locals.sortPriceUrl = buildUrl(req.originalUrl, "sort", "price");
  res.locals.sortNewestUrl = buildUrl(req.originalUrl, "sort", "newest");
  res.locals.sortPopularUrl = buildUrl(req.originalUrl, "sort", "popular");

  // chuc nang phan trang
  const limit = 6;
  // 0 -> 5, 6 -> 11,...
  options.limit = limit;
  options.offset = (page - 1) * limit;

  // tinh toang cho phan totalRowns de biet duoc co bao nhieu trang
  // vì hàm findAndCountAll nó sẽ trả về một object có 2 thuộc tính là rows và count, trong đó rows là mảng các sản phẩm được lấy ra theo điều kiện trong options, còn count là tổng số
  let { rows, count } = await models.Product.findAndCountAll(options);

  console.log("count =", count);
  console.log("rows =", rows);

  res.locals.pagination = {
    page: page,
    limit: limit,
    totalRows: count,
    queryParams: { ...req.query },
  };
  // End chuc nang phan trang, boi vi cho product la no truy van data duoi database roi

  // let products = await models.Product.findAll(options); // làm thêm chức năng phân trang thì mới thay chỗ này, còn các chức năng khác vẫn giữ nguyen
  // res.locals.products = products;

  res.locals.products = rows;
  res.render("product-list");
};

controller.showDetail = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);

  // chỉ lấy ra 1 sản phẩm thì dùng findByPk
  // let product = await models.Product.findByPk(id);

  let product = await models.Product.findOne({
    attributes: [
      "id",
      "name",
      "stars",
      "price",
      "oldPrice",
      "summary",
      "specification",
      "description",
    ],
    where: { id: id }, //co the viet {id}
    include: [
      { model: models.Image, attributes: ["name", "imagePath"] },
      {
        model: models.Review,
        attributes: ["id", "review", "stars", "createdAt"],
        include: [
          { model: models.User, attributes: ["firstName", "lastName"] },
        ],
      },
      {
        model: models.Tag,
        attributes: ["id"],
      },
    ],
  });

  res.locals.product = product;

  let tagIds = [];
  product.Tags.forEach((tag) => tagIds.push(tag.id));

  let relatedProducts = await models.Product.findAll({
    attributes: ["id", "name", "imagePath", "oldPrice", "price"],
    include: [
      {
        model: models.Tag,
        attributes: ["id"],
        where: {
          id: { [Op.in]: tagIds }, // lấy ra những sản phẩm nào có id trong mảng tagIds, tức là những sản phẩm nào có tag giống với sản phẩm đang xem chi tiết}
        },
      },
    ],
    limit: 10,
  });

  res.locals.relatedProducts = relatedProducts;

  res.render("product-detail");
};

function buildUrl(originalUrl, key, value) {
  const [path, queryString = ""] = originalUrl.split("?");
  const params = new URLSearchParams(queryString);

  params.set(key, value); // thay thế giá trị cũ, không bị duplicate
  return `${path}?${params.toString()}`;
}

module.exports = controller;

// (mối quan hệ nhiều nhiều) một sản phẩm thì có nhiều tag, một tag thì có nhiều sản phẩm,
// nên sẽ có bảng trung gian product_tags để lưu trữ mối quan hệ này, trong bảng product_tags sẽ có 2 khóa ngoại là productId và tagId,
// khi muốn lấy ra những tag nào thuộc về sản phẩm nào thì sẽ phải join 3 bảng lại với nhau, còn nếu muốn lấy ra những sản phẩm nào thuộc về tag nào thì cũng phải join 3 bảng lại với nhau
