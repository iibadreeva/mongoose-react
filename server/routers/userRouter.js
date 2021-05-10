const { Router } = require('express');
const { User } = require('../models/user');
const { Book } = require('../models/book');
const { auth } = require('../middleware/auth');

const user = (apiRouter) => {
  const app = Router();
  // get

  app.get('/auth', auth, (req, res) => {
    const { _id: id, email, name, lastname } = req.user;
    res.json({
      isAuth: true,
      id,
      email,
      name,
      lastname
    });
  });

  app.get('/logout', auth, (req, res) => {
    // res.send(req.user);
    req.user.deleteToken(req.token, (err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.sendStatus(200);
    });
  });

  app.get('/getReviewer', (req, res) => {
    const { id } = req.query;

    User.findById(id, (err, doc) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.json({
        name: doc.name,
        lastname: doc.lastname
      });
    });
  });

  app.get('/users', (req, res) => {
    User.find((err, users) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(users);
    });
  });

  app.get('/user_posts', (req, res) => {
    Book.find({ ownerId: req.query.user }).exec((err, docs) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send(docs);
    });
  });

  // post
  app.post('/register', (req, res) => {
    const { email, password, name, lastname } = req.body;
    const user = new User({ email, password, name, lastname });

    user.save((err, doc) => {
      if (err) {
        return res.json({ success: false });
      }
      return res.status(200).json({
        success: true,
        user: doc
      });
    });
  });

  app.post('/Login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          isAuth: false,
          message: 'Auth failed, email not found'
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            isAuth: false,
            message: 'Wrong password'
          });
        }
        return user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          return res.cookie('auth', user.token).json({
            isAuth: true,
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname
          });
        });
      });
    });
  });

  // update

  // delete

  apiRouter.use('/', app);
};

module.exports = { user };
