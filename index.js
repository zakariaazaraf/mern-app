// CHECK THE PROCESS ENV, IT GENERATED AUTO BY NODE
if(process.env.NODE_ENV !== 'production'){
    // REQUIRED ONLY IF WE ARE IN THE DEV ENV
    require('dotenv').config() // Lodes .env File Contents Into Process.env
}

const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// IMPORT ROUTES
const indexRouter = require('./routes/indexRoute.js')
const authorsRouter = require('./routes/authors.js')
const booksRouter = require('./routes/books')

// CONFEGERING THE ESJ ENGINE 
app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// HANDEL THE BOSY-PARSER
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// SETUP THE DATABASE REQUIREMENT
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected To DB'))

// HANDELING THE ROUTERS
app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 3000, () => console.log(`server starts on ${3000}`))