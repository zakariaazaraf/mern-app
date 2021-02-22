const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')

// IMPORT INDEX ROUTER
const indexRouter = require('./routes/indexRoute.js')

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.get('/', indexRouter /* () => console.log('root visited') */)
app.get('/shoop', () => console.log('shoop Visited'))

app.listen(process.env.PORT || 3000, () => console.log(`server starts on ${3000}`))