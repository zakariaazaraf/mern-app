const mongoose = require('mongoose')

const bookSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Author' // REFREFRNCE THE MODEL NAME
    },
    publishDate:{
        type: Date,
        required: true
    },
    pages:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    coverImageName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema)