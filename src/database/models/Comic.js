module.exports = (sequelize, dataTypes) => {
  let alias = "comic";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
  };
  let config = {
    tablename: "comics",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Comic = sequelize.define(alias, cols, config);
  Comic.associate = function (models) {
    Comic.belongsTo(models.editorial, {
      foreignKey: "editorial_id",
      as: "editorial",
    });
  };

  Comic.associate = function (models) {
    Comic.belongsTo(models.product, {
      foreignKey: "product_id",
      as: "producto",
    });
  };
  Comic.associate = function (models) {
    Comic.belongsTo(models.writer, {
      foreignKey: "writer_id",
      as: "writer",
    });
  };

  return Comic;
};
