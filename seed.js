require('dotenv').config();
require('./lib/utils/connect')();
const mongoose = require('mongoose');
const dataSA = require('./lib/utils/csvParser');
const art = require('./lib/utils/artsParser');
const library = require('./lib/services/libraryScraper');
const pdxparent = require('./lib/services/pdxParent');
const { getParksAndRec } = require('./lib/services/parksAndRec');
const { getNonProfit } = require('./lib/services/nonProfit');

Promise.all([
  art(), 
  dataSA(),
  pdxparent(),
  library(),
  getParksAndRec(),
  getNonProfit()
])
  .then(()=>console.log('done'))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
  
// art({})
//   .then(() => console.log('Done ART'))
//   .then(dataSA)
//   .then(() => console.log('done SA'))
//   .then(pdxparent)
//   .then(() => console.log('DONE PDX'))

// dataSA({})
//   .catch(err => console.error(err))
//   .finally(() => mongoose.connection.close());

// pdxparent({})
//   .catch(err => console.error(err))
//   .finally(() => mongoose.connection.close());

// library({})
//   .then(() => console.log('DONE LIBRARY'))
//   .catch(err => console.error(err))
//   .finally(() => mongoose.connection.close());

// getParksAndRec({})
//   .then(() => console.log('DONE PARKS '))
//   .catch(err => console.error(err))
//   .finally(() => mongoose.connection.close());


// getNonProfit({})
//   .then(() => console.log('DONE PROFIT'))
//   .catch(err => console.error(err))
//   .finally(() => mongoose.connection.close());


