var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

//hooking the var book from the book.js but calling it anything you want. 
//to be more sepecific, here we are calling it bookModel.
var BookModel = require('./book.js');
var AuthorModel = require('./author.js');

//this is a list of everything we want in the book & author models. 
module.exports={
	Book: BookModel,
	Author: AuthorModel

}