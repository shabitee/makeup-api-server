"use strict";

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");


const app = express();
app.use(cors());
const PORT = process.env.PORT;

// connect my node app to collection database in Mongodb server
mongoose.connect('mongodb://127.0.0.1:27017/products',{

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
    imageUrl: String,
    description: String,

});

// creating a Model
const productModel = mongoose.model("products", productSchema);



function seedProductCollection(){
    const eyeliner = new productModel({
    name: "color-pop",
    price:"5",
    imageUrl: "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
    description: "Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!",
    });
    const zorahBiocosmetiques = new productModel({
        name: "liquidliner",
        price:"6",
        imageUrl:"https://www.purpicks.com/wp-content/uploads/2018/06/Zorah-Biocosmetiques-Liquid-Liner.png",
        description: "<strong>12 hours of long-lasting</strong> intense color, transfer-free (leaves no trace on crease above the eyelid) <strong>Pure Light Capture®</strong> <strong>minerals</strong> deliver color and radiance. Silky lines and refreshingly light, Pure Argan eyeliner leaves a weightless feel on the eyelids.<p align='LEFT'>Natural cosmetic certified by Ecocert Greenlife according to Ecocert Standard available at: http://cosmetiques.ecocert.com</p>98% of the total ingredients are from natural origin 5% of total ingredients are from organic farming",
    });
    const marienatie = new productModel({
        name:"Loose Mineral Eyeshadow",
        price:"7",
        imageUrl:"https://www.purpicks.com/wp-content/uploads/csm/Loose_MineralEyeshadow_1024x1024_a958d62b-c518-4548-a2cd-9c8981f5edee1.jpg",
        description:"Rich",
        });
    const nyx = new productModel({
        name:"Sculpt & Highlight Brow Contour",
        price:"8",
        imageUrl:"https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dw2d356326/ProductImages/2016/Eyes/Sculpt_And_Highlight_Brow_Contour/sculptandhighlightbrowcontour_main.jpg?sw=390&sh=390&sm=fit",
        descriptio:"Nothing pulls together a look quite like beautifully defined brows. Enter the sleek new Sculpt & Highlight Brow Contour, our 2-in-1 pencil that defines, fills and uses shadow and light to lift the brows to eyebrow perfection.",
    });
    eyeliner.save();
    zorahBiocosmetiques.save();
    marienatie.save();
    nyx.save();
}

seedProductCollection();






app.get('/cat',testHandler);

function testHandler (req, res) {
    res.status(200).send('Welcome to my mongoose API');
}




app.listen(PORT, ()=>{
    console.log(`Welcome to Port ${PORT}`);
})
