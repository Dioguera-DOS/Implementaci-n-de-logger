class ShowMessage {
    constructor() { }

    async getMessage(req, res) {
        let message = "Oi vc acesou o end message!!!"

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(message)

    }
}

module.exports = ShowMessage




