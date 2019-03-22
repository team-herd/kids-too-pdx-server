require('dotenv').config();
const fetchEvents = require('./lib/services/datascraper');

fetchEvents()
  .then(events => {
    console.log(events, 'events');
  });

