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


















