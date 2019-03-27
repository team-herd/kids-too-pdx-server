const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(express.json());
app.use(require('./middleware/cors'));
app.use('/auth', connection, require('./routes/auth'));
app.use('/events', connection, require('./routes/events'));
app.use(handler);

module.exports = app;
