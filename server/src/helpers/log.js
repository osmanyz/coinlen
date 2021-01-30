const LogModel = require('../models/log.document');
const {anHourAgo} = require('../helpers/helpers');

module.exports = function ({req, user, type, path, method, desc, error}) {
  try {
    let userJson = user;
    let userId = null;
    let userEmail = null;
    if (typeof user === 'object' && user !== null) {
      if (user.id !== null) {
        user = userJson.toJSON();
        userId = user.id;
        userEmail = user.email;
      }
    }

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (typeof req.headers['cf-connecting-ip'] === 'string') {
      ip = req.headers['cf-connecting-ip'];
    }

    const log = new LogModel({
      type: type,
      path: path,
      method: method,
      description: desc,
      // by user
      user: user,
      userId: userId,
      userEmail: userEmail,
      // by request
      error: error,
      request: req.headers,
      url: (req.protocol + '://' + req.get('host') + req.originalUrl),
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    });

    return log.save(function (error, doc) {
      if (error) {
        console.log('LOG SAVE IS TROUBLE', error);
      }
    });
  } catch (e) {
    console.log('LOG ERROR');
    console.error(e);
  }
};

module.exports.check = function ({user, type, path, method}, callback) {
  return LogModel.countDocuments({
    userId: user.id,
    type: type,
    path: path,
    method: method,
    createdAt: {$gte: anHourAgo()},
  }, callback);
};
