//require mongoose and define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create bookSchema
var BookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    releaseDate: String
});

//create bookModel
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;

