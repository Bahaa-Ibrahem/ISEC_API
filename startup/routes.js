const express = require('express');
const cors = require('cors');
const weathers = require('../routes/weathers');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
  app.use(cors({origin: "*"}));

  app.use(express.json());

  app.use('/api/weathers', weathers);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}