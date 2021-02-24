const express = require('express')
const router = express.Router()

const Books = require('../models/book')
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

router.get('/', (req, res)=>{
    /* res.send('Root Books') */
    res.render('../views/books/index.ejs', {})
})

router.get('/new', async (req, res)=>{
    renderBookPage(res, new Books())
})

router.post('/', upload.single('cover')/*WE WANT TO UPLOAD A FILE WITH NAME OF 'cover' */, async (req, res)=>{
    // GET THE FILE NAME
    //const fileName = req.file != null ? req.file.filename : null

    const {title, author, publishDate, pages, cover, description} = req.body

    const book = new Books({
        title: title,
        description: description,
        author, author,
        pusblishDate: new Date(publishDate), // TO CONVERT THE DATE STRING CAME FROM THE REQEST
        pages: pages,
        /* coverImageName: cover */
        coverImageName: req.file.path
    })

    try {
        const newBook = await book.save()
        /* res.redirect(`books/${newBook.id}`) */
        res.redirect(`books`)
    } catch  {
        renderBookPage(res, book, true)
        //res.redirect('/')
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