const titleElement = document.querySelector("#title-element");
const priceElement = document.querySelector("#price-element");
const removeElement = document.querySelector(".btn-remove-edit-page");
const dateElement = document.querySelector(".last-edit");
let products = getSaveProducts();
const productId = location.hash.substring(1);
let product = products.find((item) => {
  return item.id === productId;
});
titleElement.value = product.title;
priceElement.value = product.price;
dateElement.textContent = `آخرین ویرایش : ${moment(product.updated)
  .locale("fa")
  .fromNow()}`;
titleElement.addEventListener("input", (e) => {
  product.title = e.target.value;
  product.updated = moment().valueOf();
  dateElement.textContent = `آخرین ویرایش : ${moment(product.updated)
    .locale("fa")
    .fromNow()}`;
  saveProducts(products);
});
priceElement.addEventListener("input", (e) => {
  product.price = e.target.value;
  product.updated = moment().valueOf();
  dateElement.textContent = `آخرین ویرایش : ${moment(product.updated)
    .locale("fa")
    .fromNow()}`;
  saveProducts(products);
});
removeElement.addEventListener("click", () => {
  removeProduct(product.id);
  saveProducts(products);
  location.assign("/index.html");
  renderProducts(products, filters);
});
window.addEventListener("storage", (e) => {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    product = products.find((item) => item.id === productId);
    if (product === undefined) {
      location.assign("./index.html");
    }
    titleElement.value = product.title;
    priceElement.value = product.price;
    dateElement.textContent = `آخرین ویرایش : ${moment(product.updated)
      .locale("fa")
      .fromNow()}`;
  }
  saveProducts(products);
});
