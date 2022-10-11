document.addEventListener("DOMContentLoaded", function () {
  const productListTemplate = document.querySelector(".productListTemplate");
  let itemsDisplay = document.querySelector("#itemsDisplay");
  const toCartTemplate = document.querySelector(".toCartTemplate");
  let toCartDisplay = document.querySelector("#toCartDisplay");
  const brandListTemplate = document.querySelector(".brandListTemplate");
  const colorListTemplate = document.querySelector(".colorListTemplate");
  const sizeListTemplate = document.querySelector(".sizeListTemplate");
  const sizeStockTemplate = document.querySelector(".sizeStockTemplate");
  const sizeStockDisplay = document.querySelector(".sizeStockDisplay");
  const sizes = document.querySelectorAll(".size");
  const navListTemplate = document.querySelector(".navListTemplate");
  const navList = document.querySelector(".navList");
  const bgNavListTemplate = document.querySelector(".bgNavListTemplate");
  const bgNavList = document.querySelector(".bgNavList");
  const decreaseBtn = document.querySelector(".decrease");
  const increaseBtn = document.querySelector(".increase");
  const qtyVal = document.querySelector(".qtyVal");
  //search/filter shoes
  const searchBtn = document.querySelector(".searchBtn");
  const brandSelect = document.querySelector(".brandSelect");
  const colorSelect = document.querySelector(".colorSelect");
  const sizeSelect = document.querySelector(".sizeSelect");
  ////Search////
  //instances
  const shoesServices = ShoesServices();

  function displayProducts() {
    shoesServices.getShoes().then(function (results) {
      let response = results.data;
      let data = response.data;
      let template = Handlebars.compile(productListTemplate.innerHTML);
      itemsDisplay.innerHTML = template({
        item: data,
      });
      addItem();
    });
  }
  displayProducts();

  //display navigation
  function navigation() {
    axios.get("/api/category").then(function (results) {
      let response = results.data;
      let data = response.data;
      let template = Handlebars.compile(navListTemplate.innerHTML);
      navList.innerHTML = template({
        category: data,
      });
      let bgTemplate = Handlebars.compile(bgNavListTemplate.innerHTML);
      bgNavList.innerHTML = bgTemplate({
        category: data,
      });
      categoryFilter();
    });
  }
  navigation();
  function categoryFilter() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        axios.get(`/api/shoes/${link.id}`).then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
      });
    });
  }
  //display brand dropdown
  function theBrands() {
    axios.get("/api/brands").then(function (results) {
      let response = results.data;
      let data = response.data;
      let brandList = [];
      data.forEach((item) => {
        brandList.push(item.brand);
      });
      let template = Handlebars.compile(brandListTemplate.innerHTML);
      brandSelect.innerHTML = template({
        brand: brandList,
      });
    });
  }
  theBrands();
  //display color dropdown
  function theColors() {
    axios.get("/api/colors").then(function (results) {
      let response = results.data;
      let data = response.data;
      let colorList = [];
      data.forEach((item) => {
        colorList.push(item.color);
      });
      let template = Handlebars.compile(colorListTemplate.innerHTML);
      colorSelect.innerHTML = template({
        color: colorList,
      });
    });
  }
  theColors();
  function theSizes() {
    axios.get("/api/sizes").then(function (results) {
      let response = results.data;
      let data = response.data;
      let sizeList = [];
      data.forEach((item) => {
        sizeList.push(item.size);
      });
      let template = Handlebars.compile(sizeListTemplate.innerHTML);
      sizeSelect.innerHTML = template({
        size: sizeList,
      });
    });
  }
  theSizes();

  //add to cart => add event listener for buttons
  //toCartItem handlebars function
  //toCartItem

  let productId = 0;
  let currentItem;
  let qtyOfSize;
  ///add to cart
  function addItem() {
    const cartBtn = document.querySelectorAll(".cartBtn");
    const product = document.querySelectorAll(".product");
    for (let i = 0; i < cartBtn.length; i++) {
      let btn = cartBtn[i];
      btn.addEventListener("click", function () {
        let id = Number(product[i].id);
        productId = id;
        sizeStockDisplay.innerHTML = "";
        qtyVal.value = 1;
        axios.get(`/api/shoes/selected/${id}`).then(function (results) {
          let response = results.data;
          let data = response.data;
          currentItem = data;
          let list = [];
          list.push(data);
          itemList = list;
          let template = Handlebars.compile(toCartTemplate.innerHTML);
          toCartDisplay.innerHTML = template({
            toCartItem: list,
          });
        });
      });
    }
  }
  sizes.forEach((size) => {
    addItem();
    size.classList.add("sizeUnselected");
    size.addEventListener("click", function () {
      qtyVal.value = 1;
      // if (!size.classList.contains("sizeSelected")) {
      //   size.classList.remove("sizeUnselected");
      //   size.classList.add("sizeSelected");
      // } else if (size.classList.contains("sizeSelected")) {
      //   size.classList.remove("sizeSelected");
      //   size.classList.add("sizeUnselected");
      // }
      let shoeSize = Number(size.id);
      let qtyList = [];
      let quantities = currentItem.quantities;
      quantities.forEach((item) => {
        if (shoeSize === item.size) {
          qtyList.push(item.stock_qty);
        }
      });
      if (qtyList.length <= 0) {
        qtyVal.value = 0;
      }
      qtyOfSize = qtyList;
      let template = Handlebars.compile(sizeStockTemplate.innerHTML);
      sizeStockDisplay.innerHTML = template({
        qty: qtyList,
      });
    });
  });
  //ADD ITEM TO CART FOR CHECKOUT

  increaseBtn.addEventListener("click", function () {
    if (qtyVal.value < qtyOfSize[0]) {
      qtyVal.value++;
    }
  });
  decreaseBtn.addEventListener("click", function () {
    if (qtyVal.value > 1) {
      qtyVal.value--;
    }
  });
  ///
  ///SEARCH FUNCTIONALITY
  searchBtn.addEventListener("click", function () {
    if (brandSelect.value) {
      axios
        .get(`/api/shoes/brand/${brandSelect.value}`)
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
    if (
      sizeSelect.value !== "SELECT SIZE" &&
      brandSelect.value === "SELECT BRAND" &&
      colorSelect.value === "SELECT COLOR"
    ) {
      axios.get(`/api/shoes/size/${sizeSelect.value}`).then(function (results) {
        let response = results.data;
        let data = response.data;
        let template = Handlebars.compile(productListTemplate.innerHTML);
        itemsDisplay.innerHTML = template({
          item: data,
        });
        addItem();
      });
    }
    if (
      colorSelect.value !== "SELECT COLOR" &&
      sizeSelect.value === "SELECT SIZE" &&
      brandSelect.value === "SELECT BRAND"
    ) {
      axios
        .get(`/api/shoes/color/${colorSelect.value}`)
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
    if (
      brandSelect.value !== "SELECT BRAND" &&
      sizeSelect.value !== "SELECT SIZE" &&
      colorSelect.value === "SELECT COLOR"
    ) {
      axios
        .get(`/api/shoes/brand/${brandSelect.value}/size/${sizeSelect.value}`)
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
    if (
      brandSelect.value !== "SELECT BRAND" &&
      colorSelect.value !== "SELECT COLOR" &&
      sizeSelect.value === "SELECT SIZE"
    ) {
      axios
        .get(`/api/shoes/brand/${brandSelect.value}/color/${colorSelect.value}`)
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
    if (
      brandSelect.value === "SELECT BRAND" &&
      colorSelect.value !== "SELECT COLOR" &&
      sizeSelect.value !== "SELECT SIZE"
    ) {
      axios
        .get(`/api/shoes/size/${sizeSelect.value}/color/${colorSelect.value}`)
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
    if (
      brandSelect.value !== "SELECT BRAND" &&
      colorSelect.value !== "SELECT COLOR" &&
      sizeSelect.value !== "SELECT SIZE"
    ) {
      axios
        .get(
          `/api/shoes/brand/${brandSelect.value}/size/${sizeSelect.value}/color/${colorSelect.value}`
        )
        .then(function (results) {
          let response = results.data;
          let data = response.data;
          let template = Handlebars.compile(productListTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data,
          });
          addItem();
        });
    }
  });
});

/////
function ShoesServices() {
  function getShoes() {
    return axios.get("/api/shoes");
  }
  function currentShoe() {
    return axios.get("/api/shoes/current");
  }
  function shoeByBrand() {
    return axios.post("/api/shoes/brand/:brandname");
  }
  return {
    getShoes,
    currentShoe,
    shoeByBrand,
  };
}
