const registerName = document.querySelector("#name");
const registerEmail = document.querySelector("#email");
const registerPass = document.querySelector("#pass");
const registerImg = document.querySelector("#pp");

if (!registerName.value) {
  registerName.classList.add("is-danger");
}
if (!registerEmail.value) {
  registerEmail.classList.add("is-danger");
}
if (!registerPass.value) {
  registerPass.classList.add("is-danger");
}

registerName.onchange = function (event) {
  let valid = checkLength(this.value, 2);
  valid
    ? this.classList.add("is-success")
    : this.classList.remove("is-success");
};

registerEmail.onchange = function (event) {
  var regex = /\S+@\S+\.\S+/;
  regex.test(this.value)
    ? this.classList.add("is-success")
    : this.classList.remove("is-success");
};

registerPass.onchange = function (event) {
  let valid = checkLength(this.value, 8);
  valid
    ? this.classList.add("is-success")
    : this.classList.remove("is-success");
};

registerImg.onchange = function (event) {
  let regex = /\.(gif|jpe?g|png|webp)$/i;
  regex.test(this.value)
    ? this.parentNode.classList.remove("bottom-isdanger")
    : this.parentNode.classList.add("bottom-isdanger");
};
function checkLength(entry, flag) {
  if (entry.length >= flag) {
    return true;
  }
  return false;
}
