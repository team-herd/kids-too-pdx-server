const request = require('superagent');
const { parse } = require('node-html-parser');

module.exports = () => {
  // return request.get('https://www.portlandoregon.gov/parks/38284')
  //   .then(res => res.text)
  //   .then(parse)
  //   .then(findAddress);
  const event = {};
  return request.get('https://events.time.ly/khatqvw?categories=13734,13729,13726,13735,13728,13739,13721,13736,13722,13724,13731,13737,13730,13723,13727&id=timely_1014534094')
    .then(res => res.text)
    .then(parse)
    .then(html => {
      let title = html.querySelectorAll('.timely-title-text').map(el => el.text);

      let venueRgx = html.querySelectorAll('.timely-venue').map(el => el.text);
      
      for(let i = 0; i < venueRgx.length; i++ ) {
        const venue = venueRgx[i].replace(/\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t/g, '');
        console.log(venue);
      }
    });
};


// const findAddress = html => {
//   const tds = html.querySelectorAll('.bluetable td').map(td => td.text);
//   console.log(tds);

//   const events = [];

//   for(let i = 8; i < tds.length; i += 8) {
//     const venue = tds[i];
//     // const day = tds[i - 7];
//     const monday = tds[i + 1];
//     const tuesday = tds[i + 2];
//     const wednesday = tds[i + 3];
//     const thursday = tds[i + 4];
//     const friday = tds[i + 5];
//     const saturday = tds[i + 6];
//     const sunday = tds[i + 7];

//     // console.log(monday.split('Family')[0].trim());
//     // console.log(venue.split('|')[1].trim());
//     console.log(tds);
//     //monday
//     events.push({
//       name: 'Family Swim',
//       date: 'monday',
//       location: {
//         address1: venue.split('|')[0].trim(),
//         address2: venue.split('|')[1].trim()
//       },
//       time: monday.split('Family')[0].trim(),
//       category: 'sports'
//     });


//   }
//   console.log(events, 'events');
// };
