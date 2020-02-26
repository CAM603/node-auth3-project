const express = require('express');

const apiRouter = require('./api-router');
const configureMiddleware = require('./configure-middleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello from Node Authentication Project #3</h1>')
});

module.exports = server;