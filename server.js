const express = require('express');

const knex = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  knex
    .select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed To Retrive Accounts'
      });
    });
});

server.get('/:id', (req, res) => {
  knex
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({
        error: `Failed To Retrieve Account With ID of ${id}`
      });
    });
});

server.post('/', (req, res) => {
  knex
    .insert(req.body, 'id')
    .into('accounts')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Cannot Add The Account'
      });
    });
});

server.put('/:id', (req, res) => {
  knex('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Failed To Update Account'
      });
    });
});

server.delete('/:id', (req, res) => {
  knex('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Could Not Delete The Account'
      });
    });
});

module.exports = server;
