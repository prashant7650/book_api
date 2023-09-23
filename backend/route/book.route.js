const express = require("express");
const {bookModel} = require("../model/book.model");
const bookRoute = express.Router();

// Add Book API
bookRoute.post("/add", async (req, res) => {
  try {
    const book = new bookModel(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Retrieve Books API
bookRoute.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    let sort = {};
    if (req.query.sortByPrice) {
      sort.price = req.query.sortByPrice;
    }
    const books = await bookModel.find(query).sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete Book API
bookRoute.delete("/del/:id", async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.send("Book deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Filter Books API
bookRoute.get("/filter", async (req, res) => {
  try {
    const books = await bookModel.find({ genre: req.query.genre });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Sort Books API
bookRoute.get("/sort", async (req, res) => {
  try {
    const sort = {};
    sort[req.query.sortBy] = req.query.order;
    const books = await bookModel.find().sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = { bookRoute };