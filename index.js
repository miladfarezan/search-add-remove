let products = getSaveProducts();
const filters = {
  searchItem: "",
  availableProducts: true,
  sortBy: "byCreated",
};

const inputSearch = document.querySelector(".input-search");
inputSearch.addEventListener("input", (e) => {
  filters.searchItem = e.target.value;
  renderProducts(products, filters);
});
const formAddProduct = document.querySelector(".form-add-products");
formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = uuidv4();
  const timeStamp = moment().valueOf();
  products.push({
    title: e.target.elements.titleProduct.value,
    price: e.target.elements.priceProduct.value,
    exist: true,
    id: id,
    updated: timeStamp,
    created: timeStamp,
  });
  e.target.elements.titleProduct.value = "";
  e.target.elements.priceProduct.value = "";
  renderProducts(products, filters);
  saveProducts(products);
});
renderProducts(products, filters);
document.querySelector(".input-chackbox").addEventListener("change", (e) => {
  filters.availableProducts = e.target.checked;
  renderProducts(products, filters);
});
window.addEventListener("storage", (e) => {
  if (e.key === "products") {
    products = JSON.parse(e.newValue);
    renderProducts(products, filters);
  }
});
document.querySelector("#sort").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderProducts(products, filters);
});
