"use strict";

const { body, validationResult } = require("express-validator");

function getErrorMessage(req) {
  let errors = validationResult(req);
  // neu danh sach loi khong rỗng (có lỗi { errors: [ {...}, {...} ] }, không có lỗi { errors: [] })
  if (!errors.isEmpty()) {
    let errorArray = errors.array();

    return errorArray.reduce((message, error) => {
      return message + error.msg + "<br/>";
    }, "");
  }
  return null; // nguoc lai khong co loi gi het
}
module.exports = { body, getErrorMessage };
