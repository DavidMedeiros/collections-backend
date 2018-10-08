const express                      = require('express');
const morgan                       = require('morgan');
const path                         = require('path');
const swaggerUi                    = require('swagger-ui-express');
var bodyParser                     = require('body-parser');
var mongoose                       = require('mongoose');
var methodOverride                 = require('method-override');
var passport                       = require('passport');
var session                        = require('express-session');
var MongoStore                     = require('connect-mongo')(session);
var cors                           = require('cors');
var corsConfig                     = require('./config/cors');
const app                          = express();

// config files
var db = require('./config/db');
var PORT = process.env.PORT || 3000;
var ENV = process.env.ENVIROMENT || 'development';

var db_url;
if (ENV === 'production') {
  db_url = db.url;
} else {
  db_url = db.local_url;
}

// Cors
if (ENV === 'production') {
  app.use(cors(corsConfig));
} else {
  app.use(cors());
}

// Mongo
mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Swagger
swaggerDocument = require('./doc/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Session Secutiry
require('./config/passport')(passport);
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 // = 60 minutos de sessão
  }),
  secret: process.env.SESSION_SECRET || 'local-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Morgan
app.use(morgan('dev'));

// Static Files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Parse application/json
app.use(bodyParser.json());

// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Api routes -------------------------------------------------------------------------
var collectionRoutes = require('./collection/collection.router');
app.use('/api/collection', collectionRoutes);

var albumRoutes = require('./album/album.router');
app.use('/api/album', albumRoutes);

var artistRoutes = require('./artist/artist.router');
app.use('/api/artist', artistRoutes);

var trackRoutes = require('./track/track.router');
app.use('/api/track', trackRoutes);

var userRoutes = require('./user/user.router');
app.use('/api/user', userRoutes);

var authRoutes = require('./user/auth.router');
app.use('/api/auth', authRoutes);

// start app
app.listen(PORT);
console.log('Kitso Collections app listening on port ' + PORT);

// expose app
module.exports = app;