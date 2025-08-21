/*const mongoose=require('mongoose')

const ProductSchema= new mongoose.Schema({
   Name:{type:String,require:true},
   Price:{type:Number,require:true},
   Quantity:{type:Number,require:true},
   Image:{type:String}
},
{ timestamps: true })

const Product=mongoose.model('Product',ProductSchema)
module.exports=Product*/









const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   Name: { type: String, required: true },
   Price: { type: Number, required: true },
   Quantity: { type: Number, required: true },
   Image: { type: String },
   Category: {
     type: String,
     enum: ['fille', 'fille-bébé', 'garçon', 'garçon-bébé'],
     required: true
   }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
