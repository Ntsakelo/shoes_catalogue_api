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
  async function selectedShoe(id, size) {
    try {
      if (id && size) {
        let results = await db.oneOrNone(
          "select  products.id , category, brand,stock_qty, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where stock.item_id = $1 and size=$2",
          [id, size]
        );
        if (results === null) {
          results = await db.oneOrNone(
            "select  products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where stock.item_id = $1 limit 1",
            [id]
          );
          return results;
        }
        return results;
      } else if (id && !size) {
        results = await db.oneOrNone(
          "select  products.id , category, brand, item AS edition, color,price, image_url from products JOIN stock ON products.id = stock.item_id where stock.item_id = $1 limit 1",
          [id]
        );
        return results;
      }
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
  };
}
