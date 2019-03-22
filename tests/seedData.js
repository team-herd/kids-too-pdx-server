const chance = require('chance').Chance();
const Event = require('../lib/models/Event');

module.exports = (totalEvents = 20) => {
  return Promise.all([...Array(totalEvents)].map(() => Event.create({
    name: chance.name(),
    date: chance.date()
  })));
};
