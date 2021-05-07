const { Router } = require('express');
const { Book } = require('../models/book');

const book = (apiRouter) => {
  const app = Router();
  // get
  app.get('/getBook', (req, res) => {
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.send(doc);
    });
  });

  app.get('/books', (req, res) => {
    // http://localhost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // order = asc || desc
    Book.find()
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.send(doc);
      });
  });

  // post
  app.post('/book', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({
        post: true,
        bookId: doc._id
      });
    });
  });

  // update
  app.put('/book_update', (req, res) => {
    Book.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.json({
          success: true,
          doc
        });
      }
    );
  });

  // delete
  app.delete('/delete_book', (req, res) => {
    const id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.json(true);
    });
  });

  apiRouter.use('/', app);
};

module.exports = { book };
