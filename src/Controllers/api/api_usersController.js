const db = require("../../database/models");
const User = db.user;
const Country = db.country;

const apiUserController = {
  list: (req, res) => {
    User.count()
      .then((c) => {
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
        }).then((result) => {
          let finalresult = [];
          for (let user of result) {
            user = { ...user.dataValues, detail: "checkuser/" + user.id };
            finalresult.push(user);
          }
          return res.send({
            meta: { status: 200, count: c },
            data: finalresult,
          });
        });
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

  countrysearch: (req, res) => {
    User.findAll({
      where: {
        "$country_fk.name$": req.params.name,
      },
      include: [
        {
          model: Country,
          as: "country_fk",
          attributes: ["id", "name"],
        },
      ],
    })
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  countrylist: (req, res) => {
    // Pausa
    Country.count()
      .then((c) => {
        Country.findAll().then((result) => {
          return res.send({ count: c, countries: result });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = apiUserController;
