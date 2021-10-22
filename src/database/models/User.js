module.exports = (sequelize, dataTypes) => {
  let alias = "user";
  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(30),
    },
    email: {
      type: dataTypes.STRING(30),
    },
    password: {
      type: dataTypes.STRING(255),
    },
    age: {
      type: dataTypes.DATE,
    },
    city: {
      type: dataTypes.STRING(30),
    },
    address: {
      type: dataTypes.STRING(30),
    },
    cp: {
      type: dataTypes.STRING(15),
    },
    avatar: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
  };

  let config = {
    tablename: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.country, {
      foreignKey: "country_id",
      as: "country_fk",
    });
  };

  return User;
};
