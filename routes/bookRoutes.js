const router = require("express").Router();
const Book = require("../models/Book.model")

router.get("/books", (req, res, next) => {

    Book.find()
    .then( (allTheBooksFromDB) => {
        //console.log("Books from DB:", allTheBooksFromDB)
        const data = {
            booksArr:allTheBooksFromDB
        }
        res.render("books/books-list", data)

    }) 

    .catch((err) => {
        console.log("ups, an error has been detected with displaying a list of books", err)
        next(error);

    })

    
});

router.get("/books/create", (req, res, next) =>{
    res.render("books/book-create")
})

router.post("/books/create", (req, res, next) =>{
    //console.log(req.body)
    const {title, author, description, rating} = req.body;
    Book.create({title, author, description, rating})
    .then(() => {
        
        res.redirect("/books")

    })

    .catch((err) => {
        console.log("ups, an error has been detected with displaying a new book", err)

    })
})

router.get("/books/:bookId", (req, res, next )=>{
    Book.findById(req.params.bookId)
    .then((booksFromDB) => {
        console.log(booksFromDB)
        res.render("books/books-details", booksFromDB)
    })

    .catch ((error)=> {
        console.log("ups, an error occured with the book ID", error)
        next (error);
    })

})




module.exports = router

