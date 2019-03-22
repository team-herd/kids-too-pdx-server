const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'event name required']
  },
  date: {
    type: Date,
    required: [true, 'event date required']
  }
});

module.exports = mongoose.model('Event', eventSchema);
