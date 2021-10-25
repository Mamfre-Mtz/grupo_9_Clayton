module.exports = (sequelize, dataTypes) => {
  let alias = "writer";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(30),
    },
  };
  let config = {
    tableName: "writers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Writer = sequelize.define(alias, cols, config);
  Writer.associate = function (models) {
    Writer.hasMany(models.comic, {
      foreignKey: "writer_id",
      as: "writer_fk"
    });
  };
  return Writer;
};
