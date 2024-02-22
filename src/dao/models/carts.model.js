const mongoose = require("mongoose");

const cartsCollection = 'carts';
const cartSchema = new mongoose.Schema(
{
    id: Number,
    products: String
},

{
    timestamps: true
})


const cartsModel = mongoose.model(cartsCollection, cartSchema)
module.exports = cartsModel