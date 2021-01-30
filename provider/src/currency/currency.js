require('dotenv').config();
const axios = require('axios');
const cron = require("node-cron");
const redis = require('../connect/redis');

/**
 * For more details
 *
 * https://openexchangerates.org
 */
// “At every 30th minute past every hour.”
cron.schedule('*/30 */1 * * *', async function () {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }

  redis.get('AUTO_UPDATE', function (error, status) {
    if (error) {
      return false;
    }

    if (status === "1") {
      makeRequest(process.env.CURRENCY_KEY_1);
    }
  });
}, {
  scheduled: true,
  timezone: process.env.TZ,
});

// “At every 59th minute past every hour.”
cron.schedule('*/59 */1 * * *', async function () {
  if (process.env.NODE_ENV !== 'production') {
    return false;
  }

  redis.get('AUTO_UPDATE', function (error, status) {
    if (error) {
      return false;
    }

    if (status === "1") {
      makeRequest(process.env.CURRENCY_KEY_2);
    }
  });
}, {
  scheduled: true,
  timezone: process.env.TZ,
});

function makeRequest(key) {
  axios.get('https://openexchangerates.org/api/latest.json?app_id=' + key)
    .then((response) => {
      let TRY = 0.0;

      if (typeof response.data.rates.TRY !== "undefined") {
        TRY = parseFloat(response.data.rates.TRY);
      }

      console.log('CURRENCY IS UPDATED', TRY);
      redis.set('CURRENCY', TRY);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

