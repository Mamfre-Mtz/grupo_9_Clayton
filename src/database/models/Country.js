module.exports = (sequelize, dataTypes) => {
  let alias = "country";
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
    tableName: "countries",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Country = sequelize.define(alias, cols, config);

  Country.associate = function (models) {
    Country.hasMany(models.user, {
      foreignKey: "country_id",
      as: "country_fk",
    });
  };

  return Country;
};
