"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const models = require("../models");
    const bcrypt = require("bcrypt");

    // update hash password
    let users = await models.User.findAll();
    let updatedUsers = [];
    users.forEach((item) => {
      updatedUsers.push({
        id: item.id,
        password: bcrypt.hashSync("Demo@123", 8),
      });
    });

    // bulkCreate() = thêm nhiều record vào database
    // updateOnDuplicate: ["password"] = nếu record đó đã tồn tại (trùng primary key = id), thì UPDATE thay vì INSERT
    await models.User.bulkCreate(updatedUsers, {
      updateOnDuplicate: ["password"],
    });
  },

  async down(queryInterface, Sequelize) {},
};
