const express = require('express');
const productRouter = express.Router();
const productController = require('./../controller/product');

productRouter.post("/create",productController.createProduct );
productRouter.get("/fetchandproduce",productController.fetchAndProduce);
productRouter.get("/getcacheddata",productController.getCachedData);
module.exports = productRouter;