const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {
  return request.get('https://multcolib.org/events/storytimes')
    .then(res => res.text)
    .then(parse)
    .then(library);
};

const library = html => {
  const dateTime = html.querySelectorAll('.date-display-single').map(el=>el.text);
  // console.log(dateTime)

  const title = html.querySelectorAll('.views-field-title').map(el => el.text);
  // console.log(title);

  const venue = html.querySelectorAll('.field-content a').map(el => el.text);
  for(let i = 0; i < venue.length; i += 2) {
    console.log(venue[i + 1]);

  }
}
