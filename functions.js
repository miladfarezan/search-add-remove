const getSaveProducts = () => {
  const productJSON = localStorage.getItem("products");
  try {
    return productJSON !== null ? JSON.parse(productJSON) : [];
  } catch (e) {
    return [];
  }
};
const removeProduct = (id) => {
  const productIndex = products.findIndex((item) => {
    return item.id === id;
  });
  if (productIndex > -1) {
    products.splice(productIndex, 1);
  }
};
const toggleProduct = (id) => {
  const product = products.find((item) => {
    return item.id === id;
  });
  if (product !== undefined) {
    product.exist = !product.exist;
  }
};

let sortProducts = (products, sortBy) => {
  if (sortBy === "byCreated") {
    return products.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byEdited") {
    return products.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      } else if (a.updated < b.updated) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return products;
  }
};

const renderProducts = function (products, filters) {
  products = sortProducts(products, filters.sortBy);
  let filterdProduct = products.filter((item) => {
    return item.title.toLowerCase().includes(filters.searchItem.toLowerCase());
  });
  filterdProduct = filterdProduct.filter((item) => {
    if (filters.availableProducts) {
      return item.exist;
    } else {
      return true;
    }
  });
  document.querySelector("#showProduct").innerHTML = "";
  filterdProduct.forEach((item) => {
    const productDivision = document.createElement("div");
    productDivision.classList.add("product-division");
    document.querySelector("#showProduct").appendChild(productDivision);
    //   // check box product
    const productCheckBox = document.createElement("input");
    productCheckBox.setAttribute("type", "checkbox");
    productDivision.appendChild(productCheckBox);
    productCheckBox.checked = !item.exist;
    productCheckBox.addEventListener("change", () => {
      toggleProduct(item.id);
      saveProducts(products);
      renderProducts(products, filters);
    });
    //   // check box product
    //   // product title
    const productName = document.createElement("a");
    productName.textContent = item.title;
    productName.setAttribute("href", `./edit-product.html#${item.id}`);
    productDivision.appendChild(productName);
    productName.classList.add("product-name");
    //   // product title
    //   // product price
    const productPrice = document.createElement("span");
    productPrice.textContent = item.price + " " + "تومان";
    productDivision.appendChild(productPrice);
    productPrice.classList.add("product-price");
    //   // product price
    //   // product Button
    const productBtn = document.createElement("button");
    productBtn.textContent = "حذف";
    productBtn.addEventListener("click", () => {
      removeProduct(item.id);
      saveProducts(products);
      renderProducts(products, filters);
    });
    productDivision.appendChild(productBtn);
    productBtn.classList.add("remove-product-btn");
    //   // product Button
  });
};
const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};
