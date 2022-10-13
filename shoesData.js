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

      await db.none(
        "insert into orders(item_id,stock_id,item,color,size,order_qty,price) values($1,$2,$3,$4,$5,$6,$7)",
        [id, stockId.id, item, color, size, qty, totalAmount]
      );
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
  };
}
