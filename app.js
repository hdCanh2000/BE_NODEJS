const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./config/passport');
const db = require('./models/index');
const routes = require('./routes');

const app = express();

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;

app.use(cors());

// connect database
const testDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
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
