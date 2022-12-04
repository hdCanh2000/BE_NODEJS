const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./config/passport');
const db = require('./models/index');
const routes = require('./routes');
const path = require('path');
const app = express();

// const whitelist = [
//   'http://localhost',
//   'http://localhost:3000',
//   'https://dwt-one.vercel.app',
//   'https://dwt.tbht.vn',
//   'http://localhost:3000/',
//   'https://dwt-one.vercel.app/',
//   'https://dwt.tbht.vn/',
// ];

app.use(cors());
//serve static assets so we can use it in form of url no need to get byte to byte via http request
app.use("/files", express.static(__dirname + '/resources/static/uploads'));
// app.use(cors({
//   origin(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (whitelist.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
// }));

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
      const {method} = req.body;
      delete req.body.method;
      return method;
    }
    return null;
  }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// api routes
app.use('/api', routes);
//static content

app.use(passport.initialize());
passport.use('jwt', config.jwtStrategy);

// eslint-disable-next-line no-underscore-dangle
global.__basedir = __dirname;

const PORT = process.env.PORT || 3002;

app.listen(PORT);

module.exports = app;
