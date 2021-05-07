const { Router } = require('express');
const { book } = require('./bookRouter');
const { user } = require('./userRouter');

const apiRouter = Router();
book(apiRouter);
user(apiRouter);

module.exports = { apiRouter };
