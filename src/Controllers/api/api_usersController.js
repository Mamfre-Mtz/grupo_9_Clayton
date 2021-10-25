const db = require("../../database/models");
const User = db.user;
const Country = db.country;

const apiUserController = {
  list: (req, res) => {
    User.findAll({
      attributes: {
        exclude: [
          "password",
          "age",
          "city",
          "address",
          "cp",
          "avatar",
          "country_id",
        ],
      },
    })
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  single: (req, res) => {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Country,
          as: "country_fk",
          attributes: ["id", "name"],
        },
      ],
      attributes: {
        exclude: ["password"],
      },
    })
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  countrylist: (req, res) => {
    return res.send("hello from: " + req.params.name);
    // Pausa
    Users.findAll({}).then((result) => {
      return res.send(result);
    });
  },
};

module.exports = apiUserController;
