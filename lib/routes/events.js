const { Router } = require('express');
const Event = require('../models/Event');
const { parse } = require('url');


const eventsFilters = query => {
  return Object.keys(query).map(key => {
    const value = query[key];
    if(key === 'ageMin') return ({ ageMin: { $eq: parseInt(value) } });
    if(key === 'ageMax') return ({ ageMax: { $lte: parseInt(value) } });
    if(key === 'price') return ({ price: { $lte: parseInt(value) } });
    if(key === 'category') return ({ category: value });
    return {};
  });
};

module.exports = Router()
  .get('/', (req, res, next) => {
    Event
      .find()
      .then(events => res.send(events))
      .catch(next);
  })

  // should this be behind auth?
  // I think you should use your ensureAuth
  // middleware here.
  .post('/', (req, res, next) => {
    Event
      .create(req.body)
      .then(event => res.send(event.toJSON()))
      .catch(next);
  })

  .get('/pending', (req, res, next) => {
    Event
      .find({ pending: true })
      .then(events => res.send(events))
      .catch(next);
  })

  .get('/approved', (req, res, next) => {
    Event
      .find({ pending: false })
      .then(events => res.send(events))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Event
      .find({ _id: req.params.id })
      .then(events => res.send(events[0]))
      .catch(next);
  })

  // no need to have the :q here
  .get('/query', (req, res, next) => {
    const { query } = parse(req.url, true);
    Event
      .find({ $and: eventsFilters(query) })
      .then(events => res.send(events))
      .catch(next);
  });
