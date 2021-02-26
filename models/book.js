const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    author:{ type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Author' /*REFREFRNCE THE MODEL NAME*/ },
    publishDate:{ type: Date, required: true },
    pages:{ type: Number, required: true },
    createdAt:{ type: Date, required: true, default: Date.now() },
    coverImageName:{ type: String, required: true },
    coverImage: { type: Buffer, required: true },
    coverImageType: { type: String, required: true }
})

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Book', bookSchema)
