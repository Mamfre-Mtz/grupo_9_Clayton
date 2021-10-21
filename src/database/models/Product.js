module.exports = (sequelize, dataTypes) => {
  let alias = "product";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(30),
    },
    available: {
      type: dataTypes.BOOLEAN,
    },
    price: {
      type: dataTypes.DECIMAL.UNSIGNED,
    },
    cover: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: dataTypes.TEXT,
    },
    discount: {
      type: dataTypes.TINYINT(3).UNSIGNED,
    },
    type: {
      type: dataTypes.STRING(20),
    },
  };
  let config = {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.hasOne(
      models.comic,
      {
        foreignKey: "product_id",
        as: "product_fk",
      },
      { onDelete: "CASCADE", hooks: true }
    );
  };

  return Product;
};
