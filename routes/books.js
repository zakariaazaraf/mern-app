const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')

const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


router.get('/', async (req, res)=>{

    const searchName = {}
    try {
        
        const {title, publishAfter, publishBefore} = req.query
        let query = Book.find() // FILTER THE QUERY
        if(title !== '' && title != null){
            query = query.regex('title', new RegExp(title, 'i'))
        }
        if(publishAfter !== '' && publishAfter != null){
            query = query.gte('publishDate', publishAfter)
        }
        if(publishBefore !== '' && publishBefore != null){
            query = query.lte('publishDate', publishBefore)
        }
        
        const books = await query.exec()
        res.render('books/index', {books: books, searchName: req.query})
    } catch {
        res.redirect(`/books`)
    }
   
})

router.get('/new', async (req, res)=>{
    renderBookPage(res, new Book())
})

router.post('/', async (req, res)=>{

    const {title, author, publishDate, pages, cover, description} = req.body

    const book = new Book({
        title: title,
        description: description,
        author, author,
        createdAt: new Date(publishDate),
        publishDate: new Date(publishDate), // TO CONVERT THE DATE STRING CAME FROM THE REQEST
        pages: pages,
        coverImageName: /* req.file.filename */ 'xx'
    })
    
    saveCover(book, cover)
    

    try {
        const newBook = await book.save()
        /* res.redirect(`books/${newBook.id}`) */
        res.redirect(`books`)
    } catch (err){

        
        renderBookPage(res, book, true)
        
    }
})

const renderBookPage = async (res, book, hasError = false) =>{
    try {
        const authors = await Author.find({})
        params = {authors: authors, book: book}
        if(hasError)  params.errorMessage = 'Error Creating Book'
        res.render('../views/books/new.ejs', params)
    }catch (err){        
        res.redirect('/')
    }
}

const saveCover = (book, coverEncoded) =>{
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
    console.log("Save Func")

  }
}

module.exports = router