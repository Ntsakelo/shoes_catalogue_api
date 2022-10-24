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
  const catCount = document.querySelector(".count");
  const ordersTemplate = document.querySelector(".ordersTemplate");
  const ordersDisplay = document.querySelector(".ordersDisplay");
  const totalTemplate = document.querySelector(".totalTemplate");
  const totalDisplay = document.querySelector(".purchase");
  const sizes = document.querySelectorAll(".size");
  const navListTemplate = document.querySelector(".navListTemplate");
  const navList = document.querySelector(".navList");
  const bgNavListTemplate = document.querySelector(".bgNavListTemplate");
  const bgNavList = document.querySelector(".bgNavList");
  const decreaseBtn = document.querySelector(".decrease");
  const increaseBtn = document.querySelector(".increase");
  const qtyVal = document.querySelector(".qtyVal");
  const addtoBag = document.querySelector(".addtoBag");
  const confirmDisplay = document.querySelector("#confirmDisplay");
  const confirmTemplate = document.querySelector(".confirmTemplate");
  const confirmBtn = document.querySelector(".confirmBtn");
  const checkOutConfirmBtn = document.querySelector(".checkOutConfirmBtn");

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
      itemsCount();
    });
  }
  itemsCount();
  displayProducts();

  //display navigation
  let catCount2;
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
      catCount2 = document.querySelector(".itemsCount");
      categoryFilter();
      itemsCount();
      displayCart();
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
  let selectedSize;
  ///add to cart
  function addItem() {
    const cartBtn = document.querySelectorAll(".cartBtn");
    const product = document.querySelectorAll(".product");
    for (let i = 0; i < cartBtn.length; i++) {
      let btn = cartBtn[i];
      btn.addEventListener("click", function () {
        sizeClass();
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
  function sizeClass() {
    for (let i = 0; i < sizes.length; i++) {
      sizes[i].classList.remove("sizeSelected");
    }
  }
  sizes.forEach((size) => {
    addItem();
    size.addEventListener("click", function () {
      // size.classList.add("sizeUnselected");
      qtyVal.value = 1;
      sizeClass();
      size.classList.add("sizeSelected");

      let shoeSize = Number(size.id);
      selectedSize = shoeSize;
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
  function itemsCount() {
    //navigation();
    // const catCount2 = document.querySelector(".itemsCount");
    axios.get("/api/shoes/cartCount").then(function (results) {
      let response = results.data;
      let data = response.data;
      catCount.innerHTML = Number(data.count);
      catCount2.innerHTML = Number(data.count);
    });
  }
  itemsCount();
  ///ADD TO BASKET
  addtoBag.addEventListener("click", function () {
    let qty = Number(qtyVal.value);

    axios
      .get(
        `/api/shoes/addToCart/item/${productId}/quantity/${qty}/size/${selectedSize}`
      )
      .then(function () {
        itemsCount();
        return;
      });
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
  let cartData;

  function displayCart() {
    const showCart = document.querySelectorAll(".showCart");
    showCart.forEach((item) => {
      item.addEventListener("click", function () {
        axios.get("/api/orders").then(function (results) {
          let response = results.data;
          let data = response.data;
          let totQty = 0;
          let totAmount = 0;
          let totList = [];
          cartData = data;
          data.forEach((item) => {
            totQty += item.order_qty;
            totAmount += Number(item.price);
          });
          totList.push({ totQty, totAmount });

          let template = Handlebars.compile(ordersTemplate.innerHTML);
          ordersDisplay.innerHTML = template({
            orderItems: data,
          });
          let template2 = Handlebars.compile(totalTemplate.innerHTML);
          totalDisplay.innerHTML = template2({
            totals: totList,
          });

          myOrderUpdate();
          confirmRemoval();
        });
      });
    });
  }

  function myOrderUpdate() {
    const itemTotal = document.querySelectorAll(".itemTotal");
    const upQty = document.querySelectorAll(".upQty");
    const downQty = document.querySelectorAll(".downQty");
    const qtyVal2 = document.querySelectorAll(".qtyVal2");
    const bagItems = document.querySelectorAll(".bagItems");

    for (let i = 0; i < upQty.length; i++) {
      let upBtn = upQty[i];
      upBtn.addEventListener("click", function () {
        let qty = 0;
        if (qtyVal2[i].value <= cartData[i].stock_qty) {
          qtyVal2[i].value++;
        }
        qty = Number(qtyVal2[i].value);
        let orderId = bagItems[i].id;
        axios
          .get(`/api/orders/edit/${qty}/${orderId}`)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            let totQty = 0;
            let totAmount = 0;

            let totList = [];
            let itemPrice;
            data.forEach((item) => {
              totQty += item.order_qty;
              if (item.id === Number(orderId)) {
                itemPrice = item.price;
              }
              totAmount += Number(item.price);
            });
            totList.push({ totQty, totAmount });
            console.log(itemPrice);
            itemTotal[i].innerHTML = "R" + itemPrice;
            let template2 = Handlebars.compile(totalTemplate.innerHTML);
            totalDisplay.innerHTML = template2({
              totals: totList,
            });
          });
      });
    }
    for (let i = 0; i < downQty.length; i++) {
      let downBtn = downQty[i];
      downBtn.addEventListener("click", function () {
        let qty = 0;

        if (Number(qtyVal2[i].value) > 1) {
          qtyVal2[i].value--;
        }
        qty = Number(qtyVal2[i].value);
        let orderId = Number(bagItems[i].id);
        axios
          .get(`/api/orders/edit/${qty}/${orderId}`)
          .then(function (results) {
            let response = results.data;
            let data = response.data;
            let totQty = 0;
            let totAmount = 0;
            let totList = [];
            let itemPrice;
            data.forEach((item) => {
              totQty += item.order_qty;
              if (item.id === Number(orderId)) {
                itemPrice = item.price;
              }
              totAmount += Number(item.price);
            });
            totList.push({ totQty, totAmount });
            itemTotal[i].innerHTML = "R" + itemPrice;
            console.log(itemPrice);
            let template2 = Handlebars.compile(totalTemplate.innerHTML);
            totalDisplay.innerHTML = template2({
              totals: totList,
            });
          });
      });
    }
  }
  let id;
  function confirmRemoval() {
    const removeBtn = document.querySelectorAll(".removeBtn");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        let orderId = btn.id;
        id = orderId;
        axios.get(`api/remove/confirm/${orderId}`).then(function (results) {
          let response = results.data;
          let data = response.data;
          let list = [];
          list.push(data);
          let template = Handlebars.compile(confirmTemplate.innerHTML);
          confirmDisplay.innerHTML = template({
            itemName: list,
          });
        });
      });
    });
  }
  //start here
  function remove() {
    confirmBtn.addEventListener("click", function () {
      axios.get(`/api/remove/${id}`).then(function (results) {
        let response = results.data;
        let data = response.data;
        let totQty = 0;
        let totAmount = 0;
        let totList = [];
        cartData = data;
        data.forEach((item) => {
          totQty += item.order_qty;
          totAmount += Number(item.price);
        });
        totList.push({ totQty, totAmount });

        let template = Handlebars.compile(ordersTemplate.innerHTML);
        ordersDisplay.innerHTML = template({
          orderItems: data,
        });
        let template2 = Handlebars.compile(totalTemplate.innerHTML);
        totalDisplay.innerHTML = template2({
          totals: totList,
        });

        myOrderUpdate();
        confirmRemoval();
        itemsCount();
      });
    });
  }
  remove();
  function checkOut() {
    checkOutConfirmBtn.addEventListener("click", function () {
      axios.get("/api/checkout").then(function (results) {
        let response = results.data;
        let data = response.data;
        let totQty = 0;
        let totAmount = 0;
        let totList = [];
        cartData = data;
        data.forEach((item) => {
          totQty += item.order_qty;
          totAmount += Number(item.price);
        });
        totList.push({ totQty, totAmount });

        let template = Handlebars.compile(ordersTemplate.innerHTML);
        ordersDisplay.innerHTML = template({
          orderItems: data,
        });
        let template2 = Handlebars.compile(totalTemplate.innerHTML);
        totalDisplay.innerHTML = template2({
          totals: totList,
        });

        myOrderUpdate();
        confirmRemoval();
        itemsCount();
      });
    });
  }
  checkOut();
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
