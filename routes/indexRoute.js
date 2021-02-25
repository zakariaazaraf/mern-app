const express = require('express')
const router = express.Router()
const Book  = require('./../models/book')

router.get('/', async (req, res) =>{
    /* res.send({
        req: req.method,
        message: 'hello you visted the root',
        originalUrl: req.originalUrl,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        body: "body " + req.body,
        app: "app " + req.app,
        cookies: "cookies " + req.cookies,
        headers: req.headers,
        hostname: req.hostname

    }) */
    let books 
    try {
         books = await Book.find().sort({createdAt: 'desc'}).limit(10)
    } catch (error) {
        books = []
        console.log(error)
    }

    res.render('index', {books: books})
    
})

module.exports = router