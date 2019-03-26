const express = require('express');
const app = express();

// const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
app.use(express.json());

app.use(require('./middleware/cors'));


app.use(express.json());
app.use(require('./middleware/cors'));

app.use(handler);

module.exports = app;
