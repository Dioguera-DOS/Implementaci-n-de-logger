const userLogin = async(req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json('Eschuchando controller productos');

}
module.exports = userLogin