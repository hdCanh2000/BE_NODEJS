const express = require('express');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./config/passport');
const db = require('./config/database');
const routes = require('./routes');

const app = express();

// connect database
const testDatabase = async () => {
  try {
    await db.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    // console.error('Unable to connect to the database:', error);
  }
};
testDatabase();

app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const { method } = req.body;
      delete req.body.method;
      return method;
    }
    return null;
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// api routes
app.use('/api', routes);

app.use(passport.initialize());
passport.use('jwt', config.jwtStrategy);

const PORT = process.env.PORT || 3002;

app.listen(PORT);

module.exports = app;
