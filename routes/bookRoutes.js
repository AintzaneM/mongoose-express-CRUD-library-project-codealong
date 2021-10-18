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

    .catch(() => {

    })

    
});

module.exports = router