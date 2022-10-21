export default function ShoesData(db) {
  async function categories() {
    try {
      let results = await db.manyOrNone(
        "select distinct category from products order by category asc"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function allShoes() {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id ORDER BY products.id;"
      );

      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function selectedShoe(id) {
    try {
      let results = await db.oneOrNone(
        "select distinct products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where products.id = $1",
        [id]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function brands() {
    try {
      let results = await db.manyOrNone(
        "select distinct brand from products order by brand asc"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function sizes() {
    try {
      let results = await db.manyOrNone(
        "select distinct size from stock order by size asc"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function colors() {
    try {
      let results = await db.manyOrNone(
        "select distinct color from stock order by color asc"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchByBrand(brand) {
    try {
      if (brand) {
        let results = await db.manyOrNone(
          "select distinct products.id , category, brand, item AS edition,color,price, image_url from products JOIN stock ON products.id = stock.item_id where brand =$1",
          [brand]
        );
        return results;
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function searchBySize(size) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition,size,color,price, image_url from products JOIN stock ON products.id = stock.item_id where size =$1",
        [size]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchByColor(color) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition,color,price, image_url from products JOIN stock ON products.id = stock.item_id where color =$1",
        [color]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchByBrandColor(brand, color) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition,color,price, image_url from products JOIN stock ON products.id = stock.item_id where color =$1 and brand=$2",
        [color, brand]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  //
  async function searchBySizeColor(size, color) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition,color,size,price, image_url from products JOIN stock ON products.id = stock.item_id where color =$1 and size=$2",
        [color, size]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchByBrandSize(brand, size) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id , category, brand, item AS edition,size,color,price, image_url from products JOIN stock ON products.id = stock.item_id where brand =$1 and size=$2",
        [brand, size]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function searchByAll(brand, size, color) {
    try {
      let results = await db.manyOrNone(
        "select distinct products.id,category,brand,item AS edition,color,size,price,image_url from products JOIN stock ON products.id = stock.item_id where brand =$1 and color =$2 and size=$3",
        [brand, color, size]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function filterCategory(category) {
    try {
      if (category === "All") {
        let results = await db.manyOrNone(
          "select distinct products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id ORDER BY products.id;"
        );
        return results;
      } else {
        let results = await db.manyOrNone(
          "select distinct products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where category = $1 ORDER BY products.id;",
          [category]
        );
        return results;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function selectedShoe(id) {
    try {
      if (id) {
        let results = await db.oneOrNone(
          "select  products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where stock.item_id = $1 limit 1",
          [id]
        );
        let sizeQty = await db.manyOrNone(
          "select size,stock_qty from stock where item_id=$1",
          [id]
        );
        if (results.quantities === undefined) {
          results.quantities = sizeQty;
        }
        //console.log(results);
        return results;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function addItem(id, size, qty) {
    try {
      if (qty === 0) {
        return;
      }
      let results = await db.oneOrNone(
        "select distinct products.id , category, brand, item AS edition,color,size,price, image_url from products JOIN stock ON products.id = stock.item_id where products.id =$1 and size=$2",
        [id, size]
      );
      let color = results.color;
      let item = results.edition;
      let price = results.price;
      let totalAmount = price * qty;
      let stockId = await db.oneOrNone(
        "select id from stock where item_id = $1 and size = $2 and color = $3",
        [id, size, color]
      );
      let count = await db.oneOrNone(
        "select count(*) from orders where item_id =$1 and size=$2 and color=$3",
        [id, size, color]
      );
      if (Number(count.count) > 0) {
        return;
      } else {
        await db.none(
          "insert into orders(item_id,stock_id,item,color,size,order_qty,price) values($1,$2,$3,$4,$5,$6,$7)",
          [id, stockId.id, item, color, size, qty, totalAmount]
        );

        await db.none(
          "update stock set stock_qty =stock_qty - $1 where id = $2 and size=$3",
          [qty, stockId.id, size]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function cartCount() {
    try {
      let results = await db.oneOrNone("select count(*) from orders");
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function displayCart() {
    try {
      let results = await db.manyOrNone(
        "select orders.id, orders.item as edition,orders.color,orders.size,order_qty,stock_qty,orders.price,image_url from orders join products on orders.item_id = products.id join stock on orders.stock_id = stock.id order by orders.id"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  async function updtQty(orderId, qty) {
    try {
      let resultQty = await db.oneOrNone(
        "select order_qty from orders where id = $1",
        [orderId]
      );
      let resultId = await db.oneOrNone(
        "select item_id from orders where id = $1",
        [orderId]
      );

      let resultsPrice = await db.oneOrNone(
        "select price from products where id=$1",
        [resultId.item_id]
      );
      let amount = Number(resultsPrice.price);
      if (qty > resultQty.order_qty) {
        let orderQty = await db.oneOrNone(
          "select order_qty from orders where id=$1",
          [orderId]
        );
        let Quantity = orderQty.order_qty;
        let size = await db.oneOrNone("select size from orders where id=$1", [
          orderId,
        ]);
        await db.none(
          "update stock set stock_qty = stock_qty + $1 where item_id=$2 and size=$3",
          [Quantity, resultId.item_id, size.size]
        );
        await db.none("update orders set order_qty = $1 where id=$2", [
          qty,
          orderId,
        ]);
        await db.none("update orders set price = $1 * $2 where id = $3", [
          amount,
          qty,
          orderId,
        ]);
        await db.none(
          "update stock set stock_qty = stock_qty - $1 where item_id=$2 and size=$3",
          [qty, resultId.item_id, size.size]
        );
      }
      ///problem is here(reverse subtract not working properly)
      if (qty < resultQty.order_qty) {
        let orderQty = await db.oneOrNone(
          "select order_qty from orders where id=$1",
          [orderId]
        );
        let Quantity = orderQty.order_qty;
        let size = await db.oneOrNone("select size from orders where id=$1", [
          orderId,
        ]);
        await db.none(
          "update stock set stock_qty = stock_qty + $1  where item_id=$2 and size=$3",
          [Quantity, resultId.item_id, size.size]
        );
        await db.none("update orders set order_qty = $1 where id=$2", [
          qty,
          orderId,
        ]);
        await db.none(
          "update orders set price = $1 * $2 where id = $3 and item_id=$4",
          [amount, qty, orderId, resultId.item_id]
        );

        await db.none(
          "update stock set stock_qty = stock_qty - $1 where item_id=$2 and size=$3",
          [qty, resultId.item_id, size.size]
        );
      }

      let results = await db.manyOrNone(
        "select orders.id, orders.item as edition,orders.color,orders.size,order_qty,stock_qty,orders.price,image_url from orders join products on orders.item_id = products.id join stock on orders.stock_id = stock.id"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  ///removal
  async function confirmData(orderId) {
    try {
      let results = await db.oneOrNone("select item from orders where id=$1", [
        orderId,
      ]);
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function removeItem(orderId) {
    try {
      let results = await db.oneOrNone(
        "select item_id,size,color,order_qty from orders where id=$1",
        [orderId]
      );
      let itemId = results.item_id;

      let size = results.size;
      let color = results.color;
      let qty = results.order_qty;
      await db.none(
        "update stock set stock_qty = stock_qty + $1 where item_id = $2 and color =$3 and size=$4",
        [qty, itemId, color, size]
      );

      await db.none("delete from orders where id=$1", [orderId]);
      let orderRslts = await db.manyOrNone(
        "select orders.id, orders.item as edition,orders.color,orders.size,order_qty,stock_qty,orders.price,image_url from orders join products on orders.item_id = products.id join stock on orders.stock_id = stock.id order by orders.id"
      );
      return orderRslts;
    } catch (err) {
      console.log(err);
    }
  }
  async function checkOutItems() {
    try {
      await db.none("delete from orders");
      let results = await db.manyOrNone(
        "select orders.id, orders.item as edition,orders.color,orders.size,order_qty,stock_qty,orders.price,image_url from orders join products on orders.item_id = products.id join stock on orders.stock_id = stock.id order by orders.id"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  ///ADMIN LOGIC
  async function getLogin(user, password) {
    try {
      let results = await db.oneOrNone(
        "select * from admin_details where username = $1 and user_password = $2",
        [user, password]
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  async function productsList() {
    try {
      let results = await db.manyOrNone(
        "select  products.id,brand, item AS edition,price,size,stock_qty,color from products JOIN stock ON products.id = stock.item_id ORDER BY products.id;"
      );
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStock(edition, size, color, quantity) {
    try {
      let itemId = await db.oneOrNone("select id from products where item=$1", [
        edition,
      ]);
      let results = await db.oneOrNone(
        "select count(*) from stock where item_id = $1 and size = $2 and color = $3",
        [itemId.id, size, color]
      );

      if (Number(results.count) === 0) {
        await db.none(
          "insert into stock(item_id,color,size,stock_qty) values($1,$2,$3,$4)",
          [itemId.id, color, size, quantity]
        );
      } else if (Number(results.count > 0)) {
        await db.none(
          "update stock set stock_qty = stock_qty + $1 where item_id = $2 and size = $3 and color = $4",
          [quantity, itemId.id, size, color]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getEdition() {
    try {
      let results = await db.manyOrNone("select item from products");
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  return {
    categories,
    allShoes,
    selectedShoe,
    brands,
    sizes,
    colors,
    searchByBrand,
    searchBySize,
    searchByColor,
    searchByBrandColor,
    searchBySizeColor,
    searchByBrandSize,
    searchByAll,
    filterCategory,
    addItem,
    cartCount,
    displayCart,
    updtQty,
    getLogin,
    productsList,
    updateStock,
    getEdition,
    confirmData,
    removeItem,
    checkOutItems,
  };
}
