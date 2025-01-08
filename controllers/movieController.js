const connection = require('../data/db')

function index(req, res) {
    res.send('elenco film')
}

function show(req, res) {
    res.send('singolo film')
}

module.exports = { index, show }