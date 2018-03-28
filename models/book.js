//require mongoose and define schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create bookSchema
var BookSchema = new Schema({
    title: String,
    //reference to author model by ID bc book has 1 author only.
    author: {
 	  type: Schema.Types.ObjectId,
 	  ref: 'Author'
    },
    image: String,
    releaseDate: String
});

//create bookModel
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;

