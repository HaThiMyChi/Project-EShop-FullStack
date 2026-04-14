"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const expressHandlebars = require("express-handlebars");
const { partials } = require("handlebars");

const { createStarList } = require("./controllers/handlebarsHelper");
const { createPagination } = require("express-handlebars-paginate");

const session = require("express-session");

const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");

// 1. Tạo Redis client
const redisClient = createClient({
  // url: "rediss://red-d7d0hg77f7vs73enf4a0:WFXNkCMaYVFqo5O8kh4uyHb641nGHMq5@oregon-keyvalue.render.com:6379",
  // url: "redis://red-d7d0hg77f7vs73enf4a0:6379",
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

const passport = require("./controllers/passport");
const flash = require("connect-flash");

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
    store: new RedisStore({
      client: redisClient,
    }), // Sử dụng Redis để lưu session
    secret: process.env.SESSION_SECRET, // Chuỗi bí mật để ký session ID cookie
    resave: false, // Không lưu lại session nếu không có thay đổi
    saveUninitialized: false, // Không tạo session cho đến khi có dữ liệu được lưu (giúp tiết kiệm tài nguyên và tuân thủ luật bảo mật)
    cookie: {
      httpOnly: true, // Ngăn chặn XSS script truy cập cookie
      maxAge: 20 * 60 * 1000, // Thời gian hết hạn của session (ví dụ: 20 phút)
      // secure: false, // Đặt là true nếu bạn đang sử dụng HTTPS
    },
  }),
);

// cau hinh su dung passport
app.use(passport.initialize());
app.use(passport.session()); // lay thong tin user tu session de dua vao req.user

// cau hinh su dung connect-flash de hien thi thong bao
app.use(flash());

// middleware khởi tạo giỏ hàng trong session nếu chưa tồn tại
app.use((req, res, next) => {
  let Cart = require("./controllers/cart");
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
  res.locals.quantity = req.session.cart.quantity; // chỗ này sẽ gửi ra cho giao diện
  res.locals.isLoggedIn = req.isAuthenticated(); // Thêm biến isLoggedIn vào res.locals để kiểm tra trạng thái đăng nhập trong giao diện (trong passport có hàm isAuthenticated() để kiểm tra xem user đã đăng nhập hay chưa)
  next();
});

// routes
app.use("/", require("./routes/indexRouter"));
app.use("/products", require("./routes/productsRouter"));
app.use("/users", require("./routes/authRouter"));
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
