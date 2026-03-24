"use strict";

let express = require("express");
let router = express.Router();
let controller = require("../controllers/productsController");

router.get("/", controller.getData, controller.show);
router.get("/:id", controller.getData, controller.showDetail); // nó truyền trên đường dẫn theo dạng id khi lấy thì dùng params, còn truyền theo dạng href thì lấy theo query

module.exports = router;
