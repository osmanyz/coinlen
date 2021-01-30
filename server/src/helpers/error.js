const winston = require('../config/winston');

module.exports.logError = function (arg) {
  winston.error({ ...arg, error: arg.error.toString() });
};
