"use strict";

const controller = {};
const models = require("../models");

controller.checkout = async (req, res) => {
  if (req.session.cart.quantity > 0) {
    let userId = 1;
    res.locals.addresses = await models.Address.findAll({ where: { userId } });
    res.locals.cart = req.session.cart.getCart();
    return res.render("checkout");
  }
  res.redirect("/products"); // nếu ko có gì thì quay về trang products
};

controller.placeorders = async (req, res) => {
  let userId = 1;
  // let { addressId, payment } = req.body;
  let addressId = isNaN(req.body.addressId) ? 0 : parseInt(req.body.addressId);
  let address = await models.Address.findByPk(addressId);

  // nếu addressId ko tồn tại thì tạo mới địa chỉ
  if (!address) {
    address = await models.Address.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      isDefault: req.body.isDefault,
      userId,
    });
  }

  // console.log("address tesst", address);
  // return res.json(address);

  // req.session = nơi lưu dữ liệu tạm cho từng user
  let cart = req.session.cart; // object chứa các sản phẩm user đã thêm vào giỏ
  cart.shippingAddress = `${address.firstName} ${address.lastName}, Email: ${address.email}, Mobile: ${address.mobile}, Address: ${address.address}, ${address.city}, ${address.country}, ${address.state}, ${address.zipCode}`;
  cart.paymentMethod = req.body.payment;

  switch (req.body.payment) {
    case "PAYPAL":
      saveOrders(req, res, "PAID");
      break;
    case "COD":
      saveOrders(req, res, "UNPAID");
      break;
  }

  // Nếu không có phương thức thanh toán nào hợp lệ, quay lại trang checkout
  // return res.redirect("/checkout");
};

async function saveOrders(req, res, status) {
  let userId = 1;
  let { items, ...others } = req.session.cart.getCart();
  let order = await models.Order.create({
    userId,
    ...others,
    status,
  });

  let orderDetails = [];
  items.forEach((item) => {
    orderDetails.push({
      orderId: order.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      total: item.total,
    });
  });
  // bulkCreate: insert nhiều bản ghi cùng lúc
  await models.OrderDetail.bulkCreate(orderDetails);
  req.session.cart.clear();
  return res.render("error", { message: "Thank you for your order!" });
}

module.exports = controller;
