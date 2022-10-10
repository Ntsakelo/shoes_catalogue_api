document.addEventListener("DOMContentLoaded", function () {
  const productListTemplate = document.querySelector(".productListTemplate");
  let itemsDisplay = document.querySelector("#itemsDisplay");
  const toCartTemplate = document.querySelector(".toCartTemplate");
  let toCartDisplay = document.querySelector("#toCartDisplay");
  const brandListTemplate = document.querySelector(".brandListTemplate");

  const colorListTemplate = document.querySelector(".colorListTemplate");

  const sizeListTemplate = document.querySelector(".sizeListTemplate");
  const navListTemplate = document.querySelector(".navListTemplate");
  const navList = document.querySelector(".navList");
  const bgNavListTemplate = document.querySelector(".bgNavListTemplate");
  const bgNavList = document.querySelector(".bgNavList");
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
  function toCartCompile(list) {
    let template = Handlebars.compile(toCartTemplate.innerHTML);
    toCartDisplay.innerHTML = template({
      toCartItem: list,
    });
  }
  let productId = 0;

  function addItem() {
    let shoeSize = 0;
    showQty();
    const cartBtn = document.querySelectorAll(".cartBtn");
    const product = document.querySelectorAll(".product");
    for (let i = 0; i < cartBtn.length; i++) {
      let btn = cartBtn[i];
      btn.addEventListener("click", function () {
        let id = Number(product[i].id);
        productId = id;
        axios
          .get(`/api/shoes/selected/${id}/${shoeSize}`)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            let list = [];

            list.push(data);
            itemList = list;
            toCartCompile(list);
            // let template = Handlebars.compile(toCartTemplate.innerHTML);
            // toCartDisplay.innerHTML = template({
            //   toCartItem: list,
            // });
            //Make this function (showQty) independent of the addItem function
          });
      });
    }
  }
  let selectedSize = 0;
  function showQty() {
    const sizes = document.querySelectorAll(".size");
    sizes.forEach((size) => {
      size.classList.remove("sizeSelected");
      size.addEventListener("click", function () {
        let shoeSize = Number(size.id);
        selectedSize = shoeSize;
        if (!size.classList.contains("sizeSelected")) {
          size.classList.remove("sizeUnselected");
          size.classList.add("sizeSelected");
        } else if (size.classList.contains("sizeSelected")) {
          size.classList.remove("sizeSelected");
          size.classList.add("sizeUnselected");
        }

        axios
          .get(`/api/shoes/selected/${productId}/${shoeSize}`)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            let list = [];

            list.push(data);
            toCartCompile(list);
            // toCartDisplay = "";
            // let template = Handlebars.compile(toCartTemplate.innerHTML);
            // toCartDisplay.innerHTML = template({
            //   toCartItem: list,
            // });
          });
      });
    });
  }
  showQty();
  //SEARCH FOR SHOES
  searchBtn.addEventListener("click", function () {
    let sizeValue = Number(sizeSelect.value);
    //alert(typeof sizeValue);
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
