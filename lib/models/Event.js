const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: {
    type: String
  },

  pending: {
    type: Boolean  
  },

  name: {
    type: String
  },

  image: {
    type: String,
    default: '../../../public/assets/default.jpg'
  },

  date: {
    type: Date
  },

  location: {
    type: Object
  },

  time: {
    type: String
  },

  price: {
    type: Number
  },

  ageMin: {
    type: Number
  },

  ageMax: {
    type: Number
  },

  description: {
    type: String
  },

  category: {
    type: String
  },

  likes: {
    type: Number
  },

  contact: {
    type: Object
  },

  reducedRate: {
    type: Boolean
  },

  website:  {
    type: String
  }
});

module.exports = mongoose.model('Event', eventSchema);
