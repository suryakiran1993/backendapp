const mongoose = require("mongoose")

const adminschema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

const admin = mongoose.model('Admin', adminschema);

module.exports = admin;