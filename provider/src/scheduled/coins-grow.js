require('dotenv').config();
const cron = require("node-cron");
const axios = require("axios");
const redis = require('../connect/redis');
const rdb = require('../connect/rdb');

function toSave(REDIS_KEY) {
  axios
    .get('https://api.binance.com/api/v3/ticker/price')
    .then(async (response) => {
      let tickerData = Object.values(response.data);
      rdb.findAll('coins')
        .then((coins) => {
          let apiCoins = new Set();
          coins.forEach((doc) => {
            let fticker = tickerData.filter((ticker) => {
              return ticker.symbol === doc.C + 'USDT';
            });

            apiCoins.add({
              coin: fticker[0].symbol.replace('USDT',''),
              price: parseFloat(fticker[0].price),
            });
          });

          redis.set(REDIS_KEY, JSON.stringify(Array.from(apiCoins)));
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This is for 23:59.9xx to save coins on redis
 */
cron.schedule('0 0 * * *', async function () {
  toSave('COINS_24H');
}, {
  scheduled: true,
  timezone: process.env.TZ,
});

cron.schedule('0 0 */12 * * *', async function () {
  toSave('COINS_12H');
}, {
  scheduled: true,
  timezone: process.env.TZ,
});

cron.schedule('0 0 */1 * * *', async function () {
  toSave('COINS_1H');
}, {
  scheduled: true,
  timezone: process.env.TZ,
});
