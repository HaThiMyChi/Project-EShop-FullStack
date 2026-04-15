"use strict";

const controller = {};
const passport = require("passport");
controller.show = (req, res) => {
  res.render("login", { loginMessage: req.flash("loginMessage") });
};

controller.login = (req, res, next) => {
  let keepSignedIn = req.body.keepSignedIn;
  // lay cart tu session
  let cart = req.session.cart;

  // Passport sẽ tìm strategy đã đăng ký tên:local-login
  passport.authenticate("local-login", (error, user) => {
    if (error) {
      // chuyen ra ben ngoai cho no xu ly
      return next(error);
    }

    // neu nhu nguoi dung chua co dang nhap duoc co loi
    if (!user) {
      return res.redirect("/users/login");
    }

    // da dang nhap thanh cong, ham nay se tra ve middleware de cho no thuc hien tiep
    // Hãy đánh dấu user này là đã đăng nhập bằng session.
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null; // 1 ngay
      req.session.cart = cart; // sau khi dang nhap thanh cong thi se gan cart vao session de tiep tuc su dung
      return res.redirect("/users/my-account");
    });
  })(req, res, next); // đang gọi middleware đó ngay lập tức.
};

controller.logout = (req, res, next) => {
  let cart = req.session.cart; // luu lai cart truoc khi logout
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    // neu khong co loi thi se chuyen huong ve trang chu

    // sau khi logout xong thi se gan cart vao session de tiep tuc su dung
    req.session.cart = cart;
    res.redirect("/");
  });
};

module.exports = controller;
