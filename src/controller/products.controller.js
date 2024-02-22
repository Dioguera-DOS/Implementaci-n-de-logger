const productosModel = require('../dao/models/productos.model');
const mongoose = require('mongoose');

const getAllProducts = async (req, res) => {
    let prod
    try {
        prod = await productosModel.find({})
        //const products = await productManager.getProducts();
        let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        if (limit < 0) {
            return res.status(400).json({ error: "Limit not acepted." }); s
        }
        if (limit) {
            const limitedProducts = prod.slice(0, limit);
            res.status(200).json(limitedProducts);
        } else {
            console.log(prod)
            return res.status(200).render('products', { prod });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error!" });
    }

}

const getProductsById = async (req, res) => {
    //let  id = req.params
    let { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) // verificar si ID es valido en MongoDB
    {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un ID con formato válido` })
    }

    let exist

    try {
        exist = await productosModel.findOne({ _id: id })
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error ineperado` })
    }

    if (!exist) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `user id ${req.params.id} not found` })

    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ product_details: exist })

}

const createProduct = async (req, res) => {
    const { title, description, price, code, stock, category, status } = req.body;

    try {

        const thumbnails = req.body.thumbnails || [];
        const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        }

        const typeValidation = {
            title: 'string',
            description: 'string',
            price: 'string',
            code: 'string',
            stock: 'string',
            category: 'string',
            status: 'string'
        };

        const invalidFields = Object.entries(typeValidation).reduce((acc, [field, type]) => {
            if (req.body[field] !== undefined) {
                if (type === 'array' && !Array.isArray(req.body[field])) {
                    acc.push(field);
                } else if (typeof req.body[field] !== type) {
                    acc.push(field);
                }
            }
            return acc;
        }, []);

        if (!Array.isArray(thumbnails)) {
            return res.status(400).json({ error: 'Formato inválido para el campo thumbnails' });
        }

        if (invalidFields.length > 0) {
            return res.status(400).json({ error: `Tipos de datos inválidos en los campos: ${invalidFields.join(', ')}` });
        }

        const productData = {
            title,
            description,
            price,
            thumbnails,
            code,
            stock,
            category,
            status: status !== undefined ? status : true
        };

        let newProd = await productosModel.create(productData)

        const responseCodes = {
            "Ya existe un producto con ese código. No se agregó nada.": 400,
            "Producto agregado correctamente.": 201,
            "Error agregando producto.": 500,
        };

        //io.emit("producto", result)

        const reStatus = responseCodes[newProd] || 500;
        return res.status(reStatus).render("products", { newProd });
        //return res.status(reStatus).json({ message: "Prod created succesfull", newProd });



    } catch (error) {
        return res.status(500).json(error._message);
    }

}

const updateProduct = async (req, res) => {
    let { pid } = req.params
    console.log(pid)
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.setHeader('Content-type', 'application/json')
        return res.status(400).json({ error: "Ivalid ID" })
    }
    let exist
    try {
        exist = await productosModel.findOne({ _id: pid })
        const productId = parseInt(req.params.pid);
        const updates = req.body;


    } catch (error) {
        res.status(500).json({ error: "Error de servidor!" });
    }

    if (!exist) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No existen usuarios con id ${pid}` })
    }

    if (req.body._id || req.body.code) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No se pueden modificar la propiedades "_id" y "code"` })
    }

    let updateProd

    try {
        updateProd = await productosModel.updateOne({ _id: pid }, req.body)
        if (updateProd.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(200).json({ payload: 'change sucessfull' })
        } else {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ payload: 'change failed' })
        }
    } catch (error) {

    }

}

const deleteProduct = async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Enter a valid ID!!!` })
    }
    let existe
    try {
        existe = await productosModel.findOne({ _id: id })
        console.log(existe)
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })
    }

    if (!existe) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `ID ${id} not exist` })
    }


    let resultado
    try {
        resultado = await productosModel.deleteOne({ _id: id })
        console.log(resultado)
        if (resultado.deletedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: "Eliminacion realizada" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No se concretó la eliminacion` })
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`, detalle: error.message })

    }

}

module.exports = { getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct }