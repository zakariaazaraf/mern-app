const express = require('express')
const router = express.Router()

const Books = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

/* const path = require('path')
const Book = require('../models/book')
const uploadPath = path.join('../public', Book.coverImagesBasePath)
const imageMimeTypes = ['image/png', 'image/jpeg', 'image/gif']

const upload = multer({
    dest: uploadPath, // Destination WHERE TO UPLOAD IMAGES
    fileFilter: (req, file, callback) =>{
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
}) */

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
        res.redirect('/')
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