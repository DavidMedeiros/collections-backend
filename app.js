const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('supertest');

const app = express();

app.use(morgan('combined'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// Basic routes
app.get('/', function(req, res) {
    res.send('Get request');
});

app.post('/', function(req, res) {
    res.send('Post request');
});

app.put('/', function(req, res) {
    res.send('Put request');
});

app.delete('/', function(req, res) {
    res.send('Delete request');
});

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

// Api routes
var collectionRoutes = require('./routes/collection');
app.use('/api/collection', collectionRoutes);

module.exports = app;
