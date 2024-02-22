const { Router } = require('express');
const {generaProducto}=require('../utils')

const router = Router()

router.get('/', (req, res) => {

    const prodCreated = generaProducto()
    res.setHeader('Content-Type', 'application/json') 
    return res.status(200).json(prodCreated)
})

module.exports = router;