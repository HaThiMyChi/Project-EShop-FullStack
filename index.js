"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require("express-handlebars");
const { partials } = require("handlebars");

const { createStarList } = require("./controllers/handlebarsHelper");
const { createPagination } = require("express-handlebars-paginate");

const session = require("express-session");

// cau hinh public static folder
app.use(express.static(__dirname + "/public"));

// Cấu hình để lấy dữ liệu từ POST request (đọc dữ liệu post từ body)
app.use(express.json()); // Để đọc dữ liệu JSON (thường dùng cho AJAX/Fetch)
app.use(express.urlencoded({ extended: false })); // Để đọc dữ liệu từ Form HTML (application/x-www-form-urlencoded)

// cau hinh su dung express-handlebars
app.engine(
  "hbs",
  expressHandlebars.engine({
    layoursDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials", // chứa layout con
    extname: "hbs",
    defaultLayout: "layout",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      createStarList,
      createPagination,
    },
  }),
);
app.set("view engine", "hbs");

// Cấu hình express-session
app.use(
  session({
    secret: "S3cret", // Chuỗi bí mật để ký session ID cookie
    resave: false, // Không lưu lại session nếu không có thay đổi
    saveUninitialized: false, // Không tạo session cho đến khi có dữ liệu được lưu (giúp tiết kiệm tài nguyên và tuân thủ luật bảo mật)
    cookie: {
      httpOnly: true, // Ngăn chặn XSS script truy cập cookie
      maxAge: 20 * 60 * 1000, // Thời gian hết hạn của session (ví dụ: 20 phút)
      // secure: false, // Đặt là true nếu bạn đang sử dụng HTTPS
    },
  }),
);

// middleware khởi tạo giỏ hàng trong session nếu chưa tồn tại
app.use((req, res, next) => {
  let Cart = require("./controllers/cart");
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
  res.locals.quantity = req.session.cart.quantity; // chỗ này sẽ gửi ra cho giao diện
  next();
});

// routes
app.use("/", require("./routes/indexRouter"));
app.use("/products", require("./routes/productsRouter"));
app.use("/users", require("./routes/usersRouter"));

app.use((req, res, next) => {
  res.status(404).render("error", { message: "File not found!" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", { message: "Internal Server Error" });
});
// Khởi động web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
