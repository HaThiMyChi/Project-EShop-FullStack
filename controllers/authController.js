"use strict";

const controller = {};
const passport = require("passport");
controller.show = (req, res) => {
  res.render("login", { loginMessage: req.flash("loginMessage") });
};

controller.login = (req, res, next) => {
  let keepSignedIn = req.body.keepSignedIn;
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
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.cookie.maxAge = keepSignedIn ? 24 * 60 * 60 * 1000 : null; // 1 ngay
      return res.redirect("/users/my-account");
    });
  })(req, res, next);
};

module.exports = controller;
