const fs = require("fs");
const path = require("path");

const User = {
  fileName: path.join(__dirname, "../Database_test/usersDb.json"),

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  generateID: function () {
    let allusers = this.findAll();
    let lastuser = allusers.pop();
    if (lastuser) return lastuser.id + 1;
    else return 1;
  },

  findAll: function () {
    return this.getData();
  },

  findByPk: function (id) {
    let allusers = this.findAll();
    let search = allusers.find((user) => user.id == id);
    return search;
  },

  findByField: function (field, text) {
    let allusers = this.findAll();
    let search = allusers.find((user) => user[field] == text);
    return search;
  },

  create: function (userData) {
    let allusers = this.findAll();
    let newUser = {
      id: this.generateID(),
      ...userData,
    };
    allusers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allusers, null, " "));
    return true;
  },

  delete: function (id) {
    let allusers = this.findAll();
    finalusers = allusers.filter((user) => user.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalusers, null, " "));
    return true;
  },
};

// console.log(
//   User.create({ user_name: "Alfredo", email: "mamfre32614@gmail.com" })
// );
// console.log(User.delete(11));
module.exports = User;
