const cartsModel = require('../dao/models/carts.model');
const CartsManager = require('../dao/managers/cartsManager');
const productosModel = require('../dao/models/productos.model');


//get all carts.
const getAllCarts = async (req, res) => {
    try {
        const carts = await cartsModel.find({});
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: "Error de servidor" });
    }

    console.log('Controle Carts exitoso')

}
//get carts by ID.

const getCartsId = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartsModel.findOne({ _id: cartId });
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error de servidor" });
    }

    console.log('Controle Carts exitoso')

}

//create a cats
const createCarts = async (req, res) => {
    const product = req.body

    if (!product) {
        return res.status(400).json({
            status: 'error',
            error: "Incomplete data, make sure specify the products to be added to the cart"
        })
    }
    try {
        let createCart = await cartsModel.create({ product });
        if (createCart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ message: `Cart created!!` });
        } else {
            res.status(500).json({ error: "Error creando carrito" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//add product to cart
const addProdTocart = async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const carts = await cartsModel.find({_id:cartId})
        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        if(cartIndex === -1) {
            return { error: "Carrito no encontrado.", status: 404 };
        }
        const cart = carts[cartIndex];
      
        const productData = await productosModel.find({_id:productId})

        const productIndex = productData.findIndex(p => p.id === productId);       

        if (productIndex === -1) {
            return { error: "Producto no encontrado.", status: 400 };
        }
        const cartProductIndex = cart.products.findIndex(product => product.id === productId);
        console.log(cartProductIndex)

        if (cartProductIndex === -1) {
            cart.products.push({ id: productId, quantity: 1 });

            const updateCart = await cartsModel.updateOne({ _id: cartId }, cart)
            console.log(updateCart)

        } else {
            cart.products[cartProductIndex].quantity++;
        }
        console.log(cart)
        return { message: "Producto agregado al carrito correctamente.", status: 200 };
    } catch (error) {
        console.error('Error al agregar producto al carrito!!!:', error.message);
        console.log(error.message);
        return { error: "Error al agregar producto al carrito.", status: 500 };
    }
}

module.exports = { getAllCarts, getCartsId, createCarts, addProdTocart }