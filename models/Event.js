const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  category: {
        type: String,
        required: true,
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  file: {
    type: String, //URL
    required: true,
  },
});

const event = mongoose.model('Event', eventSchema);

module.exports = event;
