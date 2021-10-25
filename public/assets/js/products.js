const productName = document.querySelector("#productName");
const productDescription = document.querySelector("#productDescription");
const productCover = document.querySelector("#cover");

productName.onchange = function (event) {
  let valid = checkLength(this.value, 5);
  if (valid) {
    this.classList.add("is-success");
  } else {
    this.classList.remove("is-success");
    this.classList.add("is-danger");
  }
};

productDescription.onchange = function (event) {
  let valid = checkLength(this.value, 20);
  if (valid) {
    this.classList.add("bottom-issuccess");
  } else {
    this.classList.remove("bottom-issuccess");
    this.classList.add("bottom-isdanger");
  }
};

productCover.onchange = function (event) {
  console.log("change");
  let regex = /\.(gif|jpe?g|png|webp)$/i;
  if (regex.test(this.value)) {
    this.parentNode.classList.add("bottom-issuccess");
  } else {
    this.parentNode.classList.remove("bottom-issuccess");
    this.parentNode.classList.add("bottom-isdanger");
  }
};

function checkLength(entry, flag) {
  if (entry.length >= flag) {
    return true;
  }
  return false;
}
