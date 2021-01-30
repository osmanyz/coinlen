const axios = require('axios');

module.exports = function (req) {
  let remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCAPTCHA_SECRET_KEY}&response=${req.body.recaptcha}&remoteip=${remoteip}`,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    });
};
