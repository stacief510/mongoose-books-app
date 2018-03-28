// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

//requiring all your models below: can use shorthand below or can use var modles = require('./modles/index.js')
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////

var books = [
  {
    _id: 15,
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    _id: 16,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    _id: 17,
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];


var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  console.log('books index');
  db.Book.find()
    .populate('author')
    .exec(function(err, books){
      if (err){
        console.log('index error: ' + err); }
        res.json(books);
      });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  console.log('books show', req.params);
  db.Book.findById(req.params.id, function(err, singleBook){
    if (err){
      console.log(err);
    } else {
      res.json(singleBook);
    }
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new db.Book({
    title: req.body.title,
    image: req.body.image,
    release_date: req.body.releaseDate,
  });
  //broken - fix later
      // this code will only add an author to a book if the author already exists
    //   db.Author.findOne({name: req.body.author}, function(err, author){
    //     if (newBook.author = author){
    //     // add newBook to database
    //     newBook.save(function(err, book){
    //       if (err) {
    //         console.log("create error: " + err);
    //       }
    //       console.log("created ", book.title);
    //       res.json(book);
    //     }
    //     });
    //   };

    // });

// update book
app.put('/api/books/:id', function(req,res){
// get book id from url params (`req.params`)
  console.log('books update', req.params);
 db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedBook){
  if (err){
    console.log(err);
  }else {
    res.json(updatedBook);
  }
 });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  db.Book.findByIdAndRemove(req.params.id, function(err, deletedBook){
    if (err){
      console.log(err);
    } else {
      res.json(deletedBook);
    }
  });
  });




app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
