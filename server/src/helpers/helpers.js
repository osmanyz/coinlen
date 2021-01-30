const momentTZ = require('moment-timezone');

module.exports.defaultTimezone = function () {
  return momentTZ.tz(Date.now(), process.env.TZ).toDate();
};

module.exports.tenMinutesAgo = function () {
  return momentTZ.tz(Date.now(), process.env.TZ).subtract(10, 'minutes').toDate();
};

module.exports.fiveHoursAgo = function () {
  return momentTZ.tz(Date.now(), process.env.TZ).subtract(5, 'hours').toDate();
};

module.exports.anHourAgo = function () {
  return momentTZ.tz(Date.now(), process.env.TZ).subtract(1, 'hours').toDate();
};

