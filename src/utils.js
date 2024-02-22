const { faker } = require('@faker-js/faker')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const SRECRETKEY = 'OKOHJIOHNPIHIJNKK<POKokpoKPOK'

//strategy swt con local storage.

const generateToken = (usuarios) => jwt.sign({ usuarios }, SRECRETKEY, { expiresIn: "1h" })

//midlleware authorizate/passport
const authCall = (req, res, next) => {
    // if(!req.headers.authorization){
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(401).json({error:`user not autenticate`})}
    if (!req.headers.authorization) return res.status(401).send({ error: "Unauthorized!!!" })
    //if(req.user.role!=role)return res.status(403).send({error:"No permissions!!"})
    let token = req.headers.authorization.split(" ")[1]
    try {
        let user = jwt.verify(token, SRECRETKEY)
        req.usuario = user
        next()
    } catch (error) {
        return res.status(401).json(error.message);

    }
}

//strategy passport jwb con cookie
const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user;
            next()
        })(req, res, next)

    }
}

//session destroy jwt 
userLogout = async (req, res) => {

    res.clearCookie('userCookie');
    res.redirect('/login');

}

const auth = (permisos = []) => function (req, res, next) {
    permisos = permisos.map(p => p.toLowerCase())
    console.log(req.user.rol)
    try {
        if (permisos.includes("adm")) {
            return next()

        }

        if (!req.user || !req.user.rol) {
            res.headers('Content-Type', 'application/json')
            return res.status(401).json({ error: `No hay usuarios autenticados` })

        }

        if (permisos.includes(req.user.rol.toLowerCase())) {

            res.headers('Content-Type', 'application/json')
            return res.status(403).json({ error: `No tiene privilegios para ese recurso` })

        }

        return next()


    } catch (error) {
        console.log(error.message)

    }
}

const generaProducto = () => {

    let codigo = faker.string.alphanumeric(5)
    let descrip = faker.commerce.product()
    let precio = faker.commerce.price({ min: 100, max: 200, dec: 2, symbol: '$' })
    let cantidad = faker.number.int({ min: 1, max: 20 })
    let subtotal = cantidad * Number(precio.slice(1))
    return {
        descrip, precio, cantidad, subtotal, codigo
    }
}


module.exports = { passportCall, SRECRETKEY, generateToken, authCall, userLogout, auth, generaProducto }