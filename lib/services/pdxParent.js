const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {
  return request.get('https://events.time.ly/khatqvw?categories=13734,13729,13726,13735,13728,13739,13721,13736,13722,13724,13731,13737,13730,13723,13727&id=timely_1014534094')
    .then(res => res.text)
    .then(parse)
    .then(findEvents);
};

const findEvents = html => {
  let event = {};
  let events = [];
  let title = html.querySelectorAll('.timely-title-text').map(el => el.text);
  let venueRgx = html.querySelectorAll('.timely-venue').map(el => el.text);
  
  for(let i = 0; i < venueRgx.length; i++) {
    const venue = venueRgx[i].replace(/\n\t+/g, '');
    console.log(venue)
    
  }
};