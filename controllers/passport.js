"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // dung de ma hoa mat khau
const models = require("../models");

// Ham nay duoc goi khi xac thuc thanh cong va luu thong tin user vao session
passport.serializeUser((user, done) => {
  done(null, user.id); // Lưu user ID vào session
});

// ham duoc goi boi passport.session de lay thong tin cua user tu csdl va dua vao req.user
passport.deserializeUser(async (id, done) => {
  try {
    // hàm findOne sẽ trả về một đối tượng user nếu tìm thấy, hoặc null nếu không tìm thấy
    let user = await models.User.findOne({
      attributes: ["id", "email", "firstName", "lastName", "mobile", "isAdmin"],
      where: { id },
    }); // Tìm user theo ID trong database khi load lại trang
    done(null, user); // Truyền thông tin user vào req.user
  } catch (error) {
    done(err, null);
  }
});

// ham xac thuc nguoi dung khi dang nhap
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // cho phép truyền req vào callback de kiem tra user da dang nhap chua
    },
    async (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase(); // chuyen dia chi email sang ky tu thuong
      }
      try {
        if (!req.user) {
          // neu user chua dang nhap
          let user = await models.User.findOne({
            where: { email },
          });
          if (!user) {
            // neu email chua ton tai
            return done(
              null,
              false,
              req.flash("loginMessage", "Email does not exist!"),
            );
          }
          // neu mat khai khong dung
          if (!bcrypt.compareSync(password, user.password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Invalid Password!"),
            );
          }
          // cho phep dang nhap
          return done(null, user);
        }
        // bo qua dang nhap neu user da dang nhap roi
        return done(null, req.user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

module.exports = passport;
