const { Router } = require('express');
const router = Router();

const m1 = (req, res, next) => {
    console.log('Aqui Midlleware 1')

    next()
}


const m2 = (req, res, next) => {
    console.log('Aqui Midlleware 2')
    next()
}


const m3 = (req, res, next) => {
    console.log('Aqui Midlleware 3')
    next()
}


const m4 = (req, res, next) => {
    console.log('Aqui Midlleware 4')
    next()
}

const handle = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ message: "Pagina teste" })
}


const mds = [m2,m3,m4,handle]

router.get('/', mds, (req, res) => {
    
})

module.exports = router

// const { CustomRouters } =  require('./router')

// const class 