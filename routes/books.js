const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')
const fs = require('fs')


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
        //res.render('./../public/uploads/')
        /* console.log('Root', books) */
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

    //console.log(title, author, publishDate, pages, description, req.file.filename)
    //console.log(req)

    try {
        const newBook = await book.save()
        /* res.redirect(`books/${newBook.id}`) */
        res.redirect(`books`)
        console.log("Book Created")
    } catch {

        if(req.file.filename != null){
            // REMOVE THE IMAGE IF THERE's AN ERROR
            removerCoverImage(req.file.originalname)
        }
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

const removerCoverImage = (fileName) =>{
    fs.unlink('./public/uploads/' + fileName, (err) =>{
        if(err){
            console.error(err)
            return
        }
        console.log('File Removed')
    })
}

module.exports = router