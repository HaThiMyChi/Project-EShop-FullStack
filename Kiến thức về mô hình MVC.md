# Model: Defines data structure

e.g: updates application to reflect added item

# View: Defined display (UI)

e.g: user clicks 'add to cart'

# Controller: Contains control logic

e.g: receives update from view then notifies model to 'add item'

## allowProtoPropertiesByDefault: true

Ý nghĩa:

Khi thuộc tính này được đặt thành true, Handlebars sẽ cho phép truy cập các thuộc tính được kế thừa từ prototype của một đối tượng.
Điều này có nghĩa là bạn có thể truy cập các thuộc tính không phải là "own properties" (thuộc tính trực tiếp) của đối tượng.
Mặc định:

Theo mặc định, Handlebars không cho phép truy cập các thuộc tính kế thừa từ prototype vì lý do bảo mật. Điều này giúp ngăn chặn các lỗ hổng tiềm ẩn khi dữ liệu không đáng tin cậy được truyền vào view.
