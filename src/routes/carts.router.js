// const CartsManager = require('../dao/managers/cartsManager');
// const cartsManager = new CartsManager();
const cartsModel = require('../dao/models/carts.model');
const { Router } = require('express');
const router = Router();
const {getAllCarts, getCartsId, createCarts,addProdTocart} = require('../controller/carts.controller');

// get all carts register
router.get('/', getAllCarts);

//get carts by ID.
router.get('/:cid', getCartsId);

//create a cats
router.post('/', createCarts);

//add product to cart
router.post('/:cid/product/:pid', addProdTocart);

module.exports = router