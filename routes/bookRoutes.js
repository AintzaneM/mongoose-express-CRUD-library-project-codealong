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

router.get("/books/:bookId/edit", (req, res, next) => {
    Book.findById(req.params.bookId)
    .then((booksFromDB)=>{
        res.render("books/books-edit", booksFromDB)
    })

    .catch((error)=> {
        console.log("ups, an error occured with the edit book ID", error)
        next (error);
    })


})

router.post("/books/:bookId/edit", (req, res, next) => {
    const {title, author, description, rating} = req.body;
    Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})
        .then((bookFromDB)=>{
            res.redirect("/books/" + bookFromDB._id);
        
    })
    .catch((error)=>{
        console.log("ups, an error occured with the edit book ID", error)
        next(error);
    })
    
})


router.post("/books/:bookId/delete", (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookId)
    .then(() => {
        res.redirect("/books")
    })
    .catch((error)=> {
        console.log("ups, an error occured deleting a book", error)
        next(error);

    })
})

module.exports = router

