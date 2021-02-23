const express = require('express')
const router = express.Router()

// REQUIRE THE AUTHOR MODEL FROM THE MODELS
const Author = require('../models/author')

// ALL AUTHORS ROUTER
router.get('/', (req, res) =>{
    /* res.send('Hi There You Have Visited Authors Route') */
    res.render('authors/index')
})

// NEW AUTHOR ROUTER
router.get('/new', (req, res) => {
    // RENDER THE VIEW INCLUDING THE AUTHOR MODEL TO USE IT
    res.render('authors/new', {Author: new Author()})
})

// CREATE AUTHOR ROUTER
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.author
    })

     author.save((err, authorCreate) =>{
        if(err){
            res.render('authors/new', {
                Author: author, 
                errorMessage: 'Error Creating Author'
            })
        }else{
             //res.redirect(`authors/${author.id}`) 
             res.redirect(`authors`) 
        }
    }) 
})

module.exports = router