const { Router } = require('express');
const {
  createOrg,
  deleteOrg
} = require('../services/auth');

module.exports = Router()
  .post('/', (req, res, next) => {
    createOrg({ ...req.body })
      .then(user => res.send(user))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    // this would allow anyone to delete any org
    // you should put this behind auth and make
    // sure the person deleting the org owns it
    deleteOrg(req.params.id)
      .then(res.send({ deleted: 1 }))
      .catch(next);
  });
