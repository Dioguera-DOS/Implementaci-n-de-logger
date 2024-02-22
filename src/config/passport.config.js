// //const local = require('passport-local');
// const github = require('passport-github2')
//const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const SECRETKEY = require('../utils')
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt

const extractCokie=(req)=>{
    let token=null
    if(req.cookies.userCookie){
        token=req.cookies.userCookie
    }
    // if(req && req.cookies){
    //     token = req.cookies['userCookie']
    // }

    return token
}

const initPassport=()=>{

    passport.use("jwt", new JWTStrategy(
        {
            secretOrKey:SECRETKEY.SRECRETKEY,
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractCokie])
        },
        async(jwt_payload , done)=>{
            try {
                if(jwt_payload.first_name==="Diego"){
                    return done(null, false, {message:"El usuario tiene el acceso temporalmente restringido", 
                    detalle:"Contacte al administrador"})
                }

                console.log("Passport...!!!")
                return done(null, jwt_payload) 
            } catch (error) {
                return done(error)
            } 
        }
    ))
    
}

module.exports = {initPassport}



















// const initPassport = () => {
//     passport.use('github', new github.Strategy(
//         {
//             clienteID: 'Iv1.4d66f66fd893361c',
//             clienteSecret: '0f15ed1a1d6b615f5df3d2b7b05a6625ab7e61d9',
//             callbackURl: 'http://localhost:8080/api/sessions/callbackGithub',


//         },
//         async (accessToken, refreToken, profile, done) => {
//             try {
//                 console.log('profile')






//             } catch (error) {
//                 return done(error)

//             }
//         }
//     ))

//     //serializador / desarializador
//     passport.serializeUser((usuario, done) => {
//         return done(null, usuario._id)
//     })


//     // fin initPassport
//     passport.deserializeUser(async (id, done) => {
//         let usuario = await usersModel.findById(id)
//         return done(null, usuario)
//     })

    
// }

// module.exports = initPassport