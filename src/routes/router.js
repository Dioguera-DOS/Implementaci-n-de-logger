const { Router } = require('express');


class CustomizadoRouters{
    constructor(){
        //inicializa cualquier router
        this.router=Router();
        this.init();
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta,...functions){//operador rest que almacena las funciones que llegan por la req.
        this.router.get(ruta, functions)

    }

    post(ruta,...functions){//operador rest que almacena las funciones que llegan por la req.
        this.router.post(ruta, functions)

    }

    applyCallbacks(callbacks){
        return callbacks.map(((calback)=>async(...params)=>{
            try {
                await calback.apply(this, params)
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        }))
    }



    // addtryCatch(functions){
    //     return functions.map(func=>{
    //         return async(...params)=>{
    //             try {
    //                 func.apply(this,params)
    //             } catch (error) {
                    
    //             }
    //         }
    //     })
    // }


}

module.exports = CustomizadoRouters
