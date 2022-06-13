const { createClient } = require('redis');
const client = createClient();

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'kafkapractice',
    brokers: ['localhost:9092'],
})
  
const Product = require("./../model/product");
module.exports.createProduct = async(req,res,next) =>{
    let productDetails = req.body;
    console.log(productDetails)
    let createdProduct = await Product.create(productDetails);
    res.status(200).json({
        message : "Success",
        createdProduct
    })
} 

module.exports.fetchAndProduce = async(req,res,next) =>{
    let productsFetched = await Product.find().limit(10);
    let productsToBeProduced = productsFetched.map(product => {
        return {
            key : product._id.toString(),
            value : JSON.stringify(product),
        }
    })
    console.log(productsToBeProduced)
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: 'fetchedProducts',
        messages: productsToBeProduced
        ,
    })
    await producer.disconnect()
    res.status(200).json({
        message : "Success",
        productsFetched
    })
}

module.exports.getCachedData = async(req,res,next) =>{
    await client.connect();
    const value = JSON.parse(await client.get(req.query.key));
    await client.disconnect();
    res.status(200).json({
        message : "Success",
        value
    })
}