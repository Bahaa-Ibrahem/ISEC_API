const Joi = require('joi');
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  main: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  }
});

const Weather = mongoose.model('Weather', weatherSchema);

function validateWeather(weather) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    main: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(500).required()
  };

  return Joi.validate(weather, schema);
}

exports.weatherSchema = weatherSchema;
exports.Weather = Weather; 
exports.validate = validateWeather;