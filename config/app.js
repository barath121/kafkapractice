const express = require('express')
const app = express()
//env variables intialize
require("dotenv").config();
//database connection 
require("./database")();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/product',require("./../routes/product"));
module.exports = app