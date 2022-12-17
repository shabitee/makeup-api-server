"use strict";

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// connect my node app to collection database in Mongodb server
mongoose.connect('mongodb://127.0.0.1:27017/product2',{

    // useNewUrlPaser: true,
    // useUnifiedTopology: true,
// These useNewUrlPaser: true and useUnifiedTopology: true,
// are for deprecation warning purposes. You can do without them.
});
mongoose.set('strictQuery', true);

// creating a Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    brand: String,
    imageUrl: String,
    description: String,

});

// creating a Model
const productModel = mongoose.model("products", productSchema);



function seedProductCollection(){
    const eyeliner = new productModel({
    name: "color-pop",
    price:"5",
    brand: "Mac",
    imageUrl: "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
    description: "Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!",
    });
    const zorahBiocosmetiques = new productModel({
        name: "liquidliner",
        price:"6",
        brand: "Mac",
        imageUrl:"https://www.purpicks.com/wp-content/uploads/2018/06/Zorah-Biocosmetiques-Liquid-Liner.png",
        description: "<strong>12 hours of long-lasting</strong> intense color, transfer-free (leaves no trace on crease above the eyelid) <strong>Pure Light Capture®</strong> <strong>minerals</strong> deliver color and radiance. Silky lines and refreshingly light, Pure Argan eyeliner leaves a weightless feel on the eyelids.<p align='LEFT'>Natural cosmetic certified by Ecocert Greenlife according to Ecocert Standard available at: http://cosmetiques.ecocert.com</p>98% of the total ingredients are from natural origin 5% of total ingredients are from organic farming",
    });
    const marienatie = new productModel({
        name:"Loose Mineral Eyeshadow",
        price:"7",
        brand: "Mac",
        imageUrl:"https://www.purpicks.com/wp-content/uploads/csm/Loose_MineralEyeshadow_1024x1024_a958d62b-c518-4548-a2cd-9c8981f5edee1.jpg",
        description:"Rich",
        });
    const nyx = new productModel({
        name:"Sculpt & Highlight Brow Contour",
        price:"8",
        brand: "Mac",
        imageUrl:"https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dw2d356326/ProductImages/2016/Eyes/Sculpt_And_Highlight_Brow_Contour/sculptandhighlightbrowcontour_main.jpg?sw=390&sh=390&sm=fit",
        description:"Nothing pulls together a look quite like beautifully defined brows. Enter the sleek new Sculpt & Highlight Brow Contour, our 2-in-1 pencil that defines, fills and uses shadow and light to lift the brows to eyebrow perfection.",
    });
    eyeliner.save();
    zorahBiocosmetiques.save();
    marienatie.save();
    nyx.save();
}

// seedProductCollection();


// Testing my API server.
app.get('/',testHandler);
// Getting product name by brand using query string parameter
app.get('/productbybrand/', getBrandByName);
// Creating new info for product using post
app.post ('/product',createNewProductHandler);
// Getting all products database
app.get('/product', getAllProductsHandler);
// Updating existing info for product using post
app.put('/product/:id', updateProductHandler);
// Deleted existing info for product using DELETE.
app.delete('/product/:id', deleteProductHandler);



function testHandler (req, res) {
    res.status(200).send('Welcome to my mongoose API');
}


async function getBrandByName(req, res) {
    console.log(req.query);
    const brand = req.query.brand;
    let productByName = await productModel.find({ brand:brand});
    res.send(productByName);
  }


  async function createNewProductHandler(req, res){
    console.log(req.body);
    console.log(req.body.name);
    // Method 1: From line 107 to 111
    // const name = req.body.name;
    // const price = req.body.price;
    // const brand = req.body.brand;
    // const imageUrl = req.body.imageUrl;
    // const description = req.body.description;

    // Method 2: By destructuring the former code in one line.
    const {name, price, brand, imageUrl, description} =req.body;

    let newProduct = await productModel.create({name, price, brand, imageUrl, description});

    res.send(newProduct);
}

async function getAllProductsHandler(req,res){
    let myProducts =await productModel.find({});
    res.send(myProducts)

}


// Update using PUT
async function updateProductHandler(req,res){
    console.log(req.params);
    console.log(req.body);
    const {name, brand, price, imageUrl, description} = req.body;
    const {id}= req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(id, {name, 
        brand,
        price,
        imageUrl,
        description
    });
    console.log(updatedProduct);
    res.send("Product has been updated")
}
// DeleteProductHandler usind Delete
async function deleteProductHandler(req, res){
    console.log(req.params);
    let id = req.params.id;
    let deleteProduct = await productModel.findByIdAndDelete(id);
    console.log(deleteProduct);
    res.send("Product has been successfully deleted");

}





app.listen(PORT, ()=>{
    console.log(`Welcome to Port ${PORT}`);
})
