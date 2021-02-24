const express = require('express')
const router = express.Router()

const Books = require('../models/book')

router.get('/', (req, res)=>{
    res.send('Root Books')
})

router.get('/new', (req, res)=>{
    res.send('New Book')
})

router.post('/', (req, res)=>{
    res.send('Create Book')
})

module.exports = router