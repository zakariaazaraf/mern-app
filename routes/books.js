const express = require('express')
const router = express.Router()

const Books = require('../models/book')

router.get('/', (req, res)=>{
    /* res.send('Root Books') */
    res.render('../views/books/index.ejs', {})
})

router.get('/new', (req, res)=>{
    res.render('../views/books/new.ejs')
})

router.post('/', (req, res)=>{
    res.send('Create Book')
})

module.exports = router