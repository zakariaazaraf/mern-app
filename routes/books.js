const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage})

router.get('/', async (req, res)=>{

    const serachName = {}
    try {
        const books = await Book.find({})
        res.render('books/index', {books: books})
        console.log(books)
    } catch {
        res.redirect(`/books`)
    }
   
})

router.get('/new', async (req, res)=>{
    renderBookPage(res, new Book())
})

router.post('/', upload.single('cover')/*WE WANT TO UPLOAD A FILE WITH NAME OF 'cover' */, async (req, res)=>{
    // GET THE FILE NAME
    //const fileName = req.file != null ? req.file.filename : null

    const {title, author, publishDate, pages, cover, description} = req.body

    const book = new Book({
        title: title,
        description: description,
        author, author,
        createdAt: new Date(publishDate),
        publishDate: new Date(publishDate), // TO CONVERT THE DATE STRING CAME FROM THE REQEST
        pages: pages,
        /* coverImageName: cover */
        coverImageName: req.file.filename
    })

    console.log(title, author, publishDate, pages, description, req.file.filename)

    try {
        const newBook = await book.save()
        /* res.redirect(`books/${newBook.id}`) */
        res.redirect(`books`)
        console.log("Book Created")
    } catch (err) {
        renderBookPage(res, book, true)
        //res.redirect('/')
        console.log(err)
    }
})

const renderBookPage = async (res, book, hasError = false) =>{
    try {
        const authors = await Author.find({})
        params = {authors: authors, book: book}
        if(hasError)  params.errorMessage = 'Error Creating Book'
        res.render('../views/books/new.ejs', params)
    }catch{
        res.redirect('/')
    }
}

module.exports = router