require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
// const seedData = require('./tests/seedData');
const art = require('./lib/utils/artsParser');
const data = require('./lib/utils/csvParser');
const library = require('./lib/services/libraryScraper');
const pdxparent = require('./lib/services/pdxParent');

art({})
  .then(() => console.log('Done'))
  .catch(err => console.error(err))

data({})
  .then(() => console.log('done'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());

pdxparent({})
  .then(() => console.log('done'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());

library({})
  .then(() => console.log('done'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
