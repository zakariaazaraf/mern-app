const express = require('express')
const author = require('../models/author')
const router = express.Router()

// REQUIRE THE AUTHOR MODEL FROM THE MODELS
const Author = require('../models/author')
const Book = require('../models/book')

// ALL AUTHORS ROUTER
router.get('/', async (req, res) =>{

    const serachName = {}
    if(req.method === 'GET' && req.query.author !== ''){
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
        res.redirect(`/authors/${author.id}`)
    } catch (error) {
        res.render('authors/new', {
            Author: author, 
            errorMessage: 'Error Creating Author'
        })
    }
})

// GET ONE AUTHOR BY ID
router.get('/:id', async (req, res)=>{
    const {id} = req.params
    try {
        const author = await Author.findById(id)
        const books = await Book.find({author: id})
        res.render('../views/authors/show.ejs', {author: author,books: books, id: id})
        
    } catch (error) {
        res.redirect('/authors/')
    }
})

// EDIT AUTHOR PAGE
router.get('/:id/edit', async (req, res)=>{
    try {
        const author = await Author.findById(req.params.id)
        res.render('../views/authors/edit.ejs', {author: author})
    } catch (error) {
        res.redirect('/authors')
    }
})

// EDIT THE AUTHOR
router.put('/:id', async (req, res)=>{
    const {id} = req.params
    let author
    try {
        author = await Author.findById(id)
        author.name = req.body.author
        await author.save()
        res.redirect(`/authors/${id}`)
    } catch (error) {
        if(author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit', {author: author, errorMessage: 'Error Editing Author'})
        }
    }
})

// DELETE AUTHOR
router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    let author
    try {
        author = await Author.findById(id)
        await author.remove()
        res.redirect('/authors')
    } catch (error) {
        if(author == null){
            res.redirect('/')
        }else{
            res.redirect(`/authors/${id}`)
        }
    }
})

module.exports = router