/**
 * Important note!
 *
 * Not in use.
 */

require('dotenv').config();
const axios = require('axios');
const cron = require("node-cron");
const redis = require('../connect/redis');
const xmlParser = require('xml2json');

/**
 * Currency Jobs Worker.
 * $$ * 4-22 * * 1-5
 * job will works between monday and sunday
 */
cron.schedule('*/10 6-20 * * 1-5', async function () {
  axios.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
    .then((response) => {
      let USD = 0.0;
      let TRY = 0.0;

      let json = xmlParser.toJson(response.data);
      let currencies = JSON.parse(json)["gesmes:Envelope"]["Cube"]["Cube"]["Cube"];

      currencies.forEach((c) => {
        if (c.currency === 'USD') {
          USD = parseFloat(c.rate);
        }
        if (c.currency === 'TRY') {
          TRY = parseFloat(c.rate);
        }
      });

      console.log('CURRENCY IS UPDATED', TRY/USD);
      redis.set('CURRENCY', TRY/USD);
    })
    .catch((error) => {
      console.log('error', error);
    });
// 10 * 60 * 1000 = 600000
}, {
  scheduled: true,
  timezone: process.env.TZ,
});



