const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const winston = require('winston');
const request = require('request');
const admin = require('../middleware/admin');
const {Weather, validate} = require('../models/weather');
const express = require('express');
const router = express.Router();



router.get('/:name', async (req, res) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.name}&APPID=cfb5675791e29f631fd273cc1c601897`;

  function doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      });
    });
  }

  const weather = await Weather.find({name: req.params.name});
  if (weather.length == 0) {
    let data = await doRequest(url);
    let weather = new Weather({
      name: data.name,
      main: data.weather[0].main,
      description: data.weather[0].description
    });
    weather = weather.save();
    res.send(weather);
  } else {
    res.send(weather);
  }
});

module.exports = router;