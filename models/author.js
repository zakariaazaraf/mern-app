const mongoose = require('mongoose')

// CREATE THE SCHEMA STRUCTURE
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// EXPORT THE SCHEMA, THOSE PARAMS WILL BE THE NAME OF THE TABLE IN THE DATABSE
module.exports = mongoose.model('Author', authorSchema)