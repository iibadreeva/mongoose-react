const { User } = require('../models/user');

let auth = (req, res, next) => {
  const token = req.cookies.auth;

  // findByToken описывается в моделе statics
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({
        error: true
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
