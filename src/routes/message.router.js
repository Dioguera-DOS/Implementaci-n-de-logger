const {Router} = require('express')
const ShowMessage = require('../controller/message.controller')
const showMessage= new ShowMessage()
const router =  Router();


router.get('/', showMessage.getMessage)


module.exports = router



