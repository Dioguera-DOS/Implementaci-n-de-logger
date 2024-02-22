//const handlebars = require('express-handlebars')
//file = fileStore(sessions)
// /const fileStore = require('session-file-store');
const { Server } = require('socket.io');
//const sessions = require('express-session');

const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const  usersModel  = require('./dao/models/users.model');
const {initPassport} = require('./config/passport.config');
const cookieParser = require('cookie-parser');



//routers
const routerProducts = require('./routes/products.router');
const sessionRouter = require('./routes/session.router');
const routerCarts = require('./routes/carts.router');
const routerViews = require('./routes/views.router');
const showMessage = require('./routes/message.router');
const routerMock = require('./routes/mock.prod.routes');



//instancia de class teste.
//const classPruebas = new ClassDePruebas()

//variables de ambientes
const {config}  = require('./config/config')


//const PORT = 8080
//const PORT = config.general_config.PORT
const PORT = 8080
const DBNAME = config.database.DBNAME
const MONGO_URL = config.database.MONGO_URL
const app = express();


// /const io = new Server(server)


//app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
initPassport()
app.use(cookieParser())

app.use(passport.initialize())

app.engine('handlebars', engine());


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));


app.use('/', routerViews)
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', sessionRouter)
app.use('/message', showMessage)
app.use('/api/mockingproducts', routerMock)



async function dataBase() {
    try {
        await mongoose.connect('mongodb+srv://oliveiradiogo00:z2xGXgqIUN2fgTzo@cluster0.pgeuig7.mongodb.net/?retryWrites=true&w=majority',{dbName:'ecommerce'})        
        //await mongoose.connect(MONGO_URL,{dbName:DBNAME})//{dbName:'ecommerce'}
        console.log('DB online')
    } catch (error) {
        console.log(error.message)
    }
}
dataBase()
const server = app.listen(PORT, () => console.log("Server online port " + PORT))

//module.exports = {io}



