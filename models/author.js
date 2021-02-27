const mongoose = require('mongoose')
const Book = require('./book')

// CREATE THE SCHEMA STRUCTURE
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// RESTRICATION ON DELETEING AUTHOR HAVING BOOKS
authorSchema.pre('remove', function (next) {
    Book.find({author: this.id}, (err, books)=>{
        if(err){
            next(err)
        }else if(books.length > 0){
            next(new Error('This Author Has Some Books'))
        }else{
            next()
        }
    })
})

// EXPORT THE SCHEMA, THOSE PARAMS WILL BE THE NAME OF THE TABLE IN THE DATABSE
module.exports = mongoose.model('Author', authorSchema)