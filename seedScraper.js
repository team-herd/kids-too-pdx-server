
const eventScraper = require('./lib/services/saScraper');
const parks = require('./lib/services/parkSwimScraper');
// const library = require('./lib/services/libraryScraper');
const pdxparent = require('./lib/services/pdxParent');

pdxparent()
  .then(events => {
    
  });
