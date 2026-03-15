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
