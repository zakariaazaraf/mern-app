const express = require('express')
const router = express.Router()

// REQUIRE THE AUTHOR MODEL FROM THE MODELS
const Author = require('../models/author')

// ALL AUTHORS ROUTER
router.get('/', async (req, res) =>{

    const serachName = {}
    // CHECK THE REQUEST IF INCLUDES SsearchNAME PARAMA
    /* console.log("Method ", req.method)
    console.log("Query", req.query) */

    if(req.method === 'GET' && req.query.author !== ''){
        /* searchName.name = req.query.author */
        serachName.name = new RegExp(req.query.author, 'i')
    }
    try {
        const authors = await Author.find(serachName) // .find({}) THIS MEANS WITHOUT ANY CONDITION
        res.render('authors/index', {
            authors: authors, // YOU LOOP IN "authors" TO DESPLY EACH AUTHOR
            searchName: req.query // Send The Query Which Include The Params
        }) 
    } catch {
        res.redirect('/')
    }
    /* res.send('Hi There You Have Visited Authors Route') */
    
})

// NEW AUTHOR ROUTER
router.get('/new', (req, res) => {
    // RENDER THE VIEW INCLUDING THE AUTHOR MODEL TO USE IT
    res.render('authors/new', {Author: new Author()})
})

// CREATE AUTHOR ROUTER
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.author
    })

    try {
        const newAuthor = await author.save()
        //res.redirect(`newAuthor/${author.id}`) 
        res.redirect(`authors`)
    } catch (error) {
        res.render('authors/new', {
            Author: author, 
            errorMessage: 'Error Creating Author'
        })
    }
})

module.exports = router