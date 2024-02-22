const mongoose = require('mongoose');

const productsCollection = 'products';
const productSchema = new mongoose.Schema(
{
    
    title: String,
    description: String,
    price: Number,
    thumbnails: Array,
    code: String,
    stock: Number,
    category: String,
    status: Boolean

},

// {
//     name:String,
//     last_name:String,
//     email:{
//         type: String, unique:true, required:false
//     },
//     age: Number,
//     deleted: {
//         type:Boolean, default:false
//     }
// },
{
    timestamps: true
} )


const productosModel = mongoose.model(productsCollection, productSchema)
module.exports = productosModel