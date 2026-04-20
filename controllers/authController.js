"use strict";

const controller = {};
const passport = require("passport");
const models = require("../models");
controller.show = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("login", {
    loginMessage: req.flash("loginMessage"),
    reqUrl: req.query.reqUrl,
    registerMessage: req.flash("registerMessage"),
  });
};

controller.login = (req, res, next) => {
  let keepSignedIn = req.body.keepSignedIn;
  let reqUrl = req.body.reqUrl ? req.body.reqUrl : "/users/my-account"; // nếu không có reqUrl thì mặc định sẽ chuyển hướng về trang my-account sau khi đăng nhập thành công
  // lay cart tu session
  let cart = req.session.cart;

  // Passport sẽ tìm strategy đã đăng ký tên:local-login
  passport.authenticate("local-login", (error, user) => {
    if (error) {
      // chuyen ra ben ngoai cho no xu ly
      return next(error);
    }

    // neu nhu nguoi dung chua co dang nhap duoc co loi (that bai)
    if (!user) {
      return res.redirect(`/users/login?reqUrl=${reqUrl}`);
    }

    // da dang nhap thanh cong, ham nay se tra ve middleware de cho no thuc hien tiep
    // Hãy đánh dấu user này là đã đăng nhập bằng session.
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null; // 1 ngay
      req.session.cart = cart; // sau khi dang nhap thanh cong thi se gan cart vao session de tiep tuc su dung
      return res.redirect(reqUrl);
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

controller.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // chua dang nhap thi se chuyen huong ve trang login, va truyen them reqUrl de biet duoc nguoi dung dang muon truy cap vao trang nao
    res.redirect(`/users/login?reqUrl=${req.originalUrl}`);
  }
};

controller.register = (req, res, next) => {
  let reqUrl = req.body.reqUrl ? req.body.reqUrl : "/users/my-account"; // nếu không có reqUrl thì mặc định sẽ chuyển hướng về trang my-account sau khi đăng nhập thành công
  let cart = req.session.cart; // luu lai cart truoc khi dang ky
  passport.authenticate("local-register", (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      // neu nhu ma k co user, chung ta se redirect de hien thi lai form dang ky
      return res.redirect(`/users/login?reqUrl=${reqUrl}`);
    }
    // neu nhu co user
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.cart = cart;
      res.redirect(reqUrl);
    });
  })(req, res, next);
};

controller.showForgotPassword = (req, res) => {
  res.render("forgot-password");
};
controller.forgotPassword = async (req, res) => {
  let email = req.body.email;
  // kiem tra neu email ton tai
  let user = await models.User.findOne({ where: { email } });
  if (user) {
    // tao link
    // gui email
    // Thong bao thanh cong

    return res.render("forgot-password", { done: true });
  } else {
    // nguoc lai, thong bao email khong ton tai
    return res.render("forgot-password", { message: "Email does not exist!" });
  }
};
module.exports = controller;
