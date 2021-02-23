const express = require('express')
const router = express.Router()

// ALL AUTHORS ROUTER
router.get('/', (req, res) =>{
    /* res.send('Hi There You Have Visited Authors Route') */
    res.render('authors/index')
})

// NEW AUTHOR ROUTER
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// CREATE AUTHOR ROUTER
router.post('/', (req, res) => {
    res.send('Author Created')
})

module.exports = router