"use strict";

let express = require("express");
let router = express.Router();
let controller = require("../controllers/productsController");
let cartController = require("../controllers/cartController");

router.get("/", controller.getData, controller.show);
router.get("/:id", controller.getData, controller.showDetail); // nó truyền trên đường dẫn theo dạng id khi lấy thì dùng params, còn truyền theo dạng href thì lấy theo query

router.post("/cart", cartController.add);

module.exports = router;
