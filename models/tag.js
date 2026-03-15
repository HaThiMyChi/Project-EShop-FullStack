"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1tag thì có nhiều sản phẩm có mối quan hệ nhiều nhiều
      // through là nó qua bảng trung gian là ProductTag để liên kết với bảng Product
      Tag.belongsToMany(models.Product, {
        through: "ProductTag",
        foreignKey: "tagId",
        otherKey: "productId",
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tag",
    },
  );
  return Tag;
};
