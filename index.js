"use strict";
import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import pgPromise from "pg-promise";
import ShoesData from "./shoesData.js";
import shoesApi from "./api/shoes-api.js";
import cors from "cors";
const pgp = pgPromise();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://coder:pg123@localhost:5432/shoes_catalogue";

const config = {
  connectionString: DATABASE_URL,
};

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = pgp(config);

const app = express();
app.use(cors());
app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

const shoesData = ShoesData(db);

const shoesAPI = shoesApi(shoesData);
app.get("/api/shoes", shoesAPI.displayProducts);
app.get("/api/brands", shoesAPI.showBrands);
app.get("/api/sizes", shoesAPI.showSizes);
app.get("/api/colors", shoesAPI.showColors);
app.get("/api/shoes/selected/:id", shoesAPI.getShoe);
app.get("/api/shoes/brand/:brandname", shoesAPI.searchBrand);
app.get("/api/shoes/size/:size", shoesAPI.searchSize);
app.get("/api/shoes/color/:color", shoesAPI.searchColor);
//SEARCH BY BRAND AND COLOR
app.get("/api/shoes/brand/:brandname/color/:color", shoesAPI.searchBrandColor);
//SEARCH BY COLOR AND SIZE
app.get("/api/shoes/size/:size/color/:color", shoesAPI.searchSizeColor);
//SEARCH BY BRAND AND SIZE
app.get("/api/shoes/brand/:brandname/size/:size", shoesAPI.searchBrandSize);
//SEARCH BY ALL
app.get(
  "/api/shoes/brand/:brandname/size/:size/color/:color",
  shoesAPI.searchAll
);
app.get("/api/category", shoesAPI.getCategories);
app.get("/api/shoes/:category", shoesAPI.showByCategory);
const PORT = process.env.PORT || 3060;
app.listen(PORT, function () {
  console.log("app started at port : ", PORT);
});
