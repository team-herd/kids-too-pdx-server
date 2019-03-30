const request = require('superagent');
const { parse } = require('node-html-parser');
const Event = require('../../../models/Event');

module.exports = () => {
  return request.get('https://multcolib.org/events/storytimes')
    .then(res => res.text)
    .then(parse)
    .then(library);
};

const library = html => {
  const dateTime = html.querySelectorAll('.date-display-single').map(el => el.text);
  const title = html.querySelectorAll('.view-upcoming-events-by-term-id .views-field-title a').map(el => el.text);
  const venueRgx = html.querySelectorAll('.view-upcoming-events-by-term-id .views-field-event-location-translated a').map(el => el.text);
  // create events
  return Event.create(venueRgx.map((_, i) => ({
    name: title[i],
    location: venueRgx[i],
    // are you supposed to use i here??
    date: dateTime[0].split(',')[1].trim(),
    category: 'Educational',
    pending: false,
    website: 'https://multcolib.org/events'
  })));
};
