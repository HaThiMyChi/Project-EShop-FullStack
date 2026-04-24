Phát triển ứng dụng web EShop

- Front-end:

* Sử dụng Free HTML Template có sẵn
  Free HTML Template: https://htmlcodex.com/bootstrap-ecommerce-template/

- Backend:

* NodeJS: Express, express-handlebars
* CSDL Postgres
* DBeaver: Công cụ quản trị CSDL
* sequelize: ORM (để thực hiện mã lệnh kết nối, truy vấn CSDL)

- Free Hosting

* Web Server
* Database Server

- Redis => Session

## Lý thuyết về Sequelize

Sequelize là ORM (Object-Relational Mapping) dùng để làm việc với database bằng JavaScript/TypeScript thay vì phải viết nhiều câu lệnh SQL thủ công.

Nó giúp bạn:

Kết nối database như MySQL, PostgreSQL, MariaDB, SQLite, MSSQL

Tạo model đại diện cho bảng trong database

CRUD dữ liệu dễ hơn

Create: thêm dữ liệu

Read: lấy dữ liệu

Update: cập nhật

Delete: xóa

Example:
await User.create({ name: 'Chi' }); // Create
await User.findAll(); // Read
await User.update({ name: 'My Chi' }); // Update
await User.destroy(); // Delete

Định nghĩa quan hệ giữa các bảng

one-to-one

one-to-many

many-to-many

Migration / sync database

tạo bảng

sửa cấu trúc bảng

quản lý version schema

Lợi ích của Sequelize

Code dễ đọc hơn

Đỡ viết SQL tay nhiều

Dễ quản lý model/table

Dễ làm việc với quan hệ giữa các bảng

Phù hợp với dự án Node.js + Express

Khi nào nên dùng?

Nên dùng khi:

làm backend Node.js

project CRUD

project có nhiều bảng quan hệ

muốn code nhanh, rõ ràng

Khi nào không nên quá phụ thuộc?

Nếu query quá phức tạp hoặc cần tối ưu rất sâu, đôi khi vẫn phải viết raw SQL.

# Sự khác biệt giữa npm và pnpm

- pnpm nó sẽ download các packages và lưu ở vị trí nào đó trong máy tính của chúng ta và ứng dụng của mình khi nào sử dụng, nó chỉ cần liên kết tới ứng dụng đó
  nó chỉ liên kết trong vùng nhớ mà pnpm nó đã cài sẵn

So sánh ngắn: Express, Handlerbars

Express: xử lý route, request, response

Handlebars: render HTML động

Express Handlebars: tích hợp Handlebars vào Express

# Tạo bảng dữ liệu thì chỉ cần tạo vài trường thôi, xong rồi vào code làm tiếp. Nó sẽ tạo ra 2 file trong models và migrations

Note: Khi tạo tên bảng không thêm "s" như trong CSDL

sequelize model:create --name Product --attributes name:string,imagePath:string

# Trong database có mối quan hệ nhiều nhiều, nó sẽ phát sinh ra thêm 1 bảng để chứa khóa ngoại 2 bảng, ví dụ như bảng tab và product. Nó phát sinh ra bảng productTab chứa khóa ngoại, thì sẽ có 3 models trong csdl

# Tạo mẫu dữ liệu trong seeders thì theo câu lệnh, có thể dùng https://www.mockaroo.com/ để generate data cho nhanh

sequelize seed:generate --name Brand
và chỉnh code sau đó chạy tiếp câu lệnh, để nó thực thi code
-> sequelize db:seed:all

---Lưu ý: Bảng nào có khóa ngoại thì bắt buộc phải tạo sau bảng chính, tạo generate data phải chú ý

# Lý thuyết hiểu về next() xử lý trong node

Khi next() được gọi trong indexController.js, yêu cầu sẽ được chuyển tiếp đến middleware hoặc route tiếp theo trong indexRouter.
Nếu không có route nào trong indexRouter khớp, yêu cầu sẽ được chuyển đến middleware xử lý lỗi 404.
Nếu có lỗi xảy ra, middleware xử lý lỗi 500 sẽ được gọi.

4. Khi nào next() dẫn đến lỗi 404 hoặc 500:
   Lỗi 404:
   Nếu next() được gọi trong indexController.js mà không có tham số, và không có middleware hoặc route nào khớp với yêu cầu, middleware xử lý lỗi 404 sẽ được kích hoạt.

Lỗi 500:
Nếu next(error) được gọi (với error là một đối tượng lỗi), middleware xử lý lỗi 500 sẽ được kích hoạt.

## Phân biệt slice và splice trong array

1. slice()

Dùng để cắt ra một phần của mảng.

Không làm thay đổi mảng gốc

Trả về mảng mới

Cú pháp
array.slice(start, end)

start: vị trí bắt đầu

end: vị trí kết thúc, không lấy end

Ví dụ
const arr = [10, 20, 30, 40, 50];

const result = arr.slice(1, 4);

console.log(result); // [20, 30, 40]
console.log(arr); // [10, 20, 30, 40, 50]

2. splice()

Dùng để thêm, xóa, hoặc thay thế phần tử trong mảng.

Có làm thay đổi mảng gốc

Trả về mảng chứa phần tử bị xóa

Cú pháp
array.splice(start, deleteCount, item1, item2, ...)

start: vị trí bắt đầu

deleteCount: số phần tử muốn xóa

item1, item2...: phần tử mới muốn thêm vào

Ví dụ 1: xóa phần tử
const arr = [10, 20, 30, 40, 50];

const result = arr.splice(1, 2);

console.log(result); // [20, 30]
console.log(arr); // [10, 40, 50]
Ví dụ 2: thêm phần tử
const arr = [10, 20, 30];

arr.splice(1, 0, 99);

console.log(arr); // [10, 99, 20, 30]
Ví dụ 3: thay thế phần tử
const arr = [10, 20, 30];

arr.splice(1, 1, 99);

console.log(arr); // [10, 99, 30]
Nhớ nhanh

slice = copy/cắt ra → không đổi mảng gốc

splice = chèn/xóa/sửa → có đổi mảng gốc

Mẹo nhớ

slice gần giống “cắt lát” → lấy ra một phần

splice gần giống “phẫu thuật/chỉnh sửa” → can thiệp trực tiếp vào mảng

# Nếu muốn chạy sequelize cụ thể 1 file nào thì chỉ cần lệnh như này

sequelize db:seed --seed 9-Star.js

# hiểu về include trong models truy vấn lấy tất cả dữ liệu trong bảng

include: [{ model: models.Product }]

Đây là phần quan trọng bạn đang hỏi.

include dùng để làm gì?

include trong Sequelize dùng để join bảng liên quan.

Nó giống như:

SQL JOIN hoặc lấy dữ liệu của bảng có quan hệ với nhau

Ở đây:

include: [{ model: models.Product }] nghĩa là:

Khi lấy Category, lấy luôn các Product thuộc category đó.

## Phân biệt each, with trong template engineer handlebars

############ with
Dùng cho 1 object

{{#with user}}
{{name}}
{{/with}}

Example để hiểu
Tác dụng

Khi vào trong {{#with user}}, Handlebars hiểu rằng:

name = user.name
age = user.age
email = user.email

########### each
Dùng cho mảng / danh sách

{{#each products}}

  <p>{{name}}</p>
{{/each}}

### Phân biệt findByPk, findOne

1. findByPk
   chỉ tìm theo khóa chính
   viết ngắn hơn
   rất tiện khi tìm theo id

   Example: Product.findByPk(1);

2. findOne
   tìm theo bất kỳ điều kiện nào
   linh hoạt hơn
   có thể tìm theo email, name, categoryId, ...
   nếu có nhiều record thỏa mãn, nó chỉ lấy 1 cái đầu tiên
   còn không có nó trả về null

   Example: Product.findOne({
   where: { categoryId: 2 },
   });

## Phân biệt Op.like và Op.iLike khi nào dùng trong Sequelize

Dùng Op.like khi:
bạn muốn search thông thường
database của bạn không phải PostgreSQL
hoặc bạn chấp nhận behavior theo collation của DB
Dùng Op.iLike khi:
bạn dùng PostgreSQL
muốn user gõ iphone, IPHONE, iPhone đều ra kết quả giống nhau

#### Giải thích chức năng Cart

1. Sự khác biệt giữa Middleware này và Controller
   Middleware (trong index.js): Nó chạy trong mọi request (bất kể khách xem trang chủ, xem chi tiết, hay thêm giỏ hàng). Nhiệm vụ của nó là "chuẩn bị" sẵn cái giỏ hàng.
   Controller (cartController.add): Chỉ chạy khi khách nhấn nút "Add to Cart" (gửi POST request). Nhiệm vụ của nó là thực hiện hành động thêm.
2. Luồng chạy chi tiết (The Logic Flow)
   Khi khách hàng truy cập vào website của bạn, các bước sau sẽ xảy ra:

Giai đoạn Session nạp dữ liệu: express-session nhìn vào Cookie của trình duyệt, tìm trong Server xem dữ liệu của ông khách này là gì, rồi gán vào req.session. Lúc này req.session.cart chỉ là một đối tượng JSON thô (không có các hàm như .add(), .quantity).
Giai đoạn "Hồi sinh" đối tượng (Rehydration): Middleware của bạn chạy:
Nó lấy dữ liệu thô từ req.session.cart.
Nó gọi new Cart(dữ liệu thô). Class Cart sẽ biến các dữ liệu thô đó thành một đối tượng thực thụ có đầy đủ các phương thức logic.
Nó ghi đè lại: req.session.cart = new Cart(...). Bây giờ req.session.cart đã có thể gọi được lệnh .add().
Giai đoạn hiển thị: Nó tính toán req.session.cart.quantity và gán vào res.locals.quantity để Header của trang web luôn hiện đúng số lượng sản phẩm.
Giai đoạn Hành động (Nếu là POST /cart): Khi khách nhấn thêm hàng, cartController.add được gọi. Lúc này, nhờ Middleware trên đã chạy trước đó, nó chỉ việc gọi req.session.cart.add(product, quantity) một cách dễ dàng.

### Phương thức PUT và PATCH

- PUT update toàn bộ
- PATCH update 1 phần

## Hàm findByPk trong sequelize dùng để:

👉 Tìm 1 record theo khóa chính (Primary Key – PK)

##### dotenv

dotenv dùng để quản lý biến môi trường trong NodeJS, giúp tách config như database URL, API key, session secret ra khỏi source code, tăng bảo mật và dễ deploy.

- setup luôn .env chuẩn cho project EShop của bạn
- hoặc hướng dẫn config multi-env (dev / production)

🔐 passport là gì?

passport là một thư viện trong Node.js (Express) dùng để xử lý authentication (xác thực người dùng).

👉 Nói đơn giản:

Kiểm tra user là ai
Xác nhận login đúng hay sai
Quản lý đăng nhập (session / token)

#### Hiểu về bulkCreate

User.bulkCreate(data, {
updateOnDuplicate: ['password']
});

👉 Hành vi: Kết quả
Trường hợp
❌ Chưa tồn tại 👉 INSERT (tạo mới)
✅ Đã tồn tại (trùng key) 👉 UPDATE các field trong updateOnDuplicate

=> bulkCreate inserts new records and if a duplicate key (primary key or unique key) is found, it updates the specified fields using updateOnDuplicate.

## Cách hiểu hoạt động chức năng login

uồng chạy của request /login
Middleware 1
express.urlencoded(...)

Nhiệm vụ:

đọc dữ liệu form POST
gắn vào req.body

Sau middleware này:

req.body.login
req.body.password
req.body.remember

đã có dữ liệu.

## Sơ đồ dễ nhớ chức năng login

[Form login]
│
│ POST /users/login
▼
router.post("/login", controller.login)
▼
controller.login(req, res, next)
▼
passport.authenticate("local-login", callback)(req, res, next)
▼
Passport tìm strategy tên "local-login"
▼
passport.use("local-login", new LocalStrategy(...))
▼
LocalStrategy kiểm tra:

- tìm user
- so sánh password bằng bcrypt
  ▼
  done(null, false) hoặc done(null, user)
  ▼
  callback trong controller nhận kết quả
  ▼
  nếu fail -> redirect /users/login
  nếu success -> req.logIn(user, ...)
  ▼
  passport.serializeUser((user, done) => done(null, user.id))
  ▼
  session lưu user.id
  ▼
  res.redirect("/users/my-account")

  #### next() nghĩa là:

Cho request đi tiếp sang middleware / route handler tiếp theo

#### Sau khi login thành công:

req.logIn(user, ...)

Passport sẽ:

gọi serializeUser() để lưu user.id vào session
ở request sau, passport.session() sẽ gọi deserializeUser()
gắn user vào:

### Khác nhau {{ }}, {{{ }}} trong html

Trường hợp Nên dùng
Text bình thường {{ }}
Có HTML {{{ }}}
Dữ liệu từ user ❌ không dùng {{{ }}

## http://localhost:5000/products?page=2&sort=price

- req.originalUrl: /products?page=2&sort=price
- req.path: /products
- req.query: { page: 2, sort: 'price' }

## onchange và onkeyup

- onchange: khi value thay đổi xong + mất focus
- onkeyup: mỗi lần thả phím (gõ xong 1 ký tự)

## Chức năng “Forgot Password”

Với Node.js + Express + node-mailjet, chức năng quên mật khẩu thường làm theo luồng này:

- User nhập email ở form “Forgot Password”
- Server kiểm tra email có tồn tại không
- Tạo token reset password
- Lưu token + thời gian hết hạn vào database
- Gửi email chứa link reset
- User bấm link đó để vào trang reset password
- User nhập mật khẩu mới
- Server kiểm tra token còn hợp lệ không rồi cập nhật password

## jsonwebtoken có 2 hàm chính

- sign() -> tạo token
  Dùng để tạo ra JWT (token) từ dữ liệu
  👉 Hiểu đơn giản:
  Đóng gói thông tin + ký lại bằng secret

- verify() -> kiểm tra token
  Dùng để: Kiểm tra token có hợp lệ không
  Giải mã token ra dữ liệu bên trong
  👉 Hiểu đơn giản:
  Mở gói + kiểm tra có bị sửa không + còn hạn không

### Hiểu về jsonwebtoken

jsonwebtoken là thư viện trong Node.js dùng để tạo và kiểm tra JWT

JWT thường dùng cho:

- Đăng nhập/xác thực người dùng (Authentication)
- Phân quyền người dùng (Authorization)
- Forgot Password (gửi link reset password)
- Email verification (xác minh email)
- API bảo mật

JWT là một chuỗi token dạng như này:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Token này chứa thông tin như:
-user id, email, role, thời gian hết hạn

secretKey: là chìa khóa bí mật dể mã hóa token
expiresIn: thời gian sống của token

Lưu ý: Nếu token sai hoặc hết hạn nó sẽ báo lỗi: jsonwebTokenError, TokenExpiredError

### Access Token và Refresh Token khác nhau như thế nào?

- Access Token dùng để truy cập API, thời gian sống ngắn
- Refresh Token dùng để tạo Access Token mới khi Access Token hết hạn, thời gian sống dài hơn

-> Khi Access Token hết hạn, frontend gửi Refresh Token lên server -> server cấp Access Token mới

### JWT lưu ở đâu?

Thường luu ở localstorage, sessionStorage, HttpOnly Cookie (an toàn hơn)
Production thường ưu tiên Cookie vì bảo mật hơn

### Vì sao cần expiresIn?

Để token có thời gian hết hạn, tránh bị sử dụng mãi mãi nếu bị lộ
ví dụ: expiresIn: "15m"
Nếu hacker lấy được token, họ chỉ dùng được 15 phút -> tăng bảo mật

### JWT có bảo mật tuyệt đối không?

Không, JWT chỉ an toàn khi:
secret key mạnh, HTTPS, expiresIn hợp lý, lưu token đúng cách, chống XSS/CSRF

### JWT dùng cho forgot password thế nào?

Server tạo token chứa email hoặc userId và gửi link reset password qua email
Người dùng bấm link -> server verify token -> cho phép đổi mật khẩu

### Password login Demo@123
