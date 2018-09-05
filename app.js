const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const swagger = require('swagger-express');
const app = express();

// config files
var db = require('./config/db');

mongoose.connect(db.local_url, { useNewUrlParser: true });

// API documentation UI
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/api/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './doc/swagger/',
    apis: ['./routes/collection.js']
  }));
  

app.use(morgan('dev'));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Api routes
var collectionRoutes = require('./routes/collection');
app.use('/api/collection', collectionRoutes);

module.exports = app;