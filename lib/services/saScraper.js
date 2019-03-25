const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {
  return request.get('https://www.saturdayacademy.org/computer-science-camps')
    .then(res => res.text)
    .then(parse)
    .then(html => {
      // field field-name-body field-type-text-with-summary field-label-hidden c
      console.log(html.querySelectorAll('.field-label-hidden').map(p => p.text));
    });
};
