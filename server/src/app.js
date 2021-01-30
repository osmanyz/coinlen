require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const winston = require('./config/winston');

const lang = require('./translate/index');
global.lang = lang;

// routes
const authMiddleware = require('./middleware/auth');
const roleMiddleware = require('./middleware/role');

// set passport
authMiddleware.passport(passport);

// app
const app = express();

// initialization for app
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    let allowedOrigins = [
      'https://coinlen.com',
      'https://www.coinlen.com',
      'https://app.coinlen.com',
      'https://admin.coinlen.com',
      'https://commerce.coinbase.com',
    ];
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push('http://localhost:3000');
      allowedOrigins.push('http://localhost:3001');
      allowedOrigins.push('http://localhost:3002');
    }
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) === -1) {
      let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));
app.use(
  morgan(
    'combined',
    {stream: winston.stream}
  )
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize({}));

// set routes
app.use('/auth', require('./routes/auth'));
app.use('/api/payment',
  authMiddleware.requireJWT(passport),
  roleMiddleware('user', 'admin'),
  require('./routes/api/payment')
);
app.use('/api/user',
  authMiddleware.requireJWT(passport),
  roleMiddleware('user', 'admin'),
  require('./routes/api/user')
);
app.use('/api/coin',
  authMiddleware.requireJWT(passport),
  roleMiddleware('user', 'admin'),
  require('./routes/api/coin')
);
app.use('/api/notification-PAYLASMA',
  authMiddleware.requireJWT(passport),
  roleMiddleware('user', 'admin'),
  require('./routes/api/notification')
);
// admin
app.use('/admin/dashboard',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/dashboard')
);
app.use('/admin/user',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/user')
);
app.use('/admin/currency',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/currency')
);
app.use('/admin/coin/format',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/coin.format')
);
app.use('/admin/coin',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/coin')
);
app.use('/admin/notification-PAYLASMA',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/notification')
);
app.use('/admin/payment',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/payment')
);
app.use('/admin/log',
  authMiddleware.requireJWT(passport),
  roleMiddleware('admin'),
  require('./routes/admin/log')
);
app.use('/coinbase-payment-gateway', require('./routes/webhook'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('err', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  // for normal error page you can use it `400`s
  res.status(err.status || 500);
  res.json({
    statusCode: err.status || 500,
    status: false,
    ...err,
  });
});

module.exports = app;
