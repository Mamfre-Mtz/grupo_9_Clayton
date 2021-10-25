const registerEmail = document.querySelector("#email");
const registerPass = document.querySelector("#pass");

registerEmail.onchange = function (event) {
  var regex = /\S+@\S+\.\S+/;
  regex.test(this.value)
    ? this.classList.add("is-success")
    : this.classList.remove("is-success");
};

registerPass.onchange = function (event) {
  valid.length >= 8
    ? this.classList.add("is-success")
    : this.classList.remove("is-success");
};
