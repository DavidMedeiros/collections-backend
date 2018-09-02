const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser     = require('body-parser');
var mongoose = require('mongoose');

const app = express();

// config files
var db = require('./config/db');

mongoose.connect(db.local_url, { useNewUrlParser: true });

app.use(morgan('combined'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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