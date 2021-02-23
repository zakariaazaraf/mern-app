const express = require('express')
const route = express.Router()

route.get('/authors', (req, res) =>{
    res.send('Hi There You Have Visited Authors Route')
})

module.exports = route