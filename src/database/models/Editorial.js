module.exports = (sequelize, dataTypes) => {
  let alias = "editorial";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(30),
    },
    cover: {
      type: dataTypes.STRING(100),
    },
  };
  let config = {
    tableName: "editorials",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Editorial = sequelize.define(alias, cols, config);
  Editorial.associate = function (models) {
    Editorial.hasMany(models.comic, {
      foreignKey: "editorial_id",
      as: "editorial",
    });
  };
  return Editorial;
};
