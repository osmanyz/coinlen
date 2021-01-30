require('dotenv').config();
const axios = require('axios');
const rdb = require('../connect/rdb');

/**
 * Paribu doesn't have any document yet.
 */

console.log('working on progress by {Paribu.com} provider');
setInterval(function () {
  axios.get('https://v3.paribu.com/app/initials')
    .then((response) => response.data)
    .then((response) => response.data)
    .then((response) => response.ticker)
    .then((data) => {
      let tickerCoins = new Map();

      Object.keys(data).forEach(function (key) {
        if (key.search("-tl") === -1) {
          return false;
        }

        const keyy = (key).replace("-tl", "").toUpperCase();
        tickerCoins.set(keyy, {
          ...data[key],
          coin: keyy
        });
      });

      rdb.findAll('coins')
        .then((coins) => {
          coins.forEach((doc) => {
            let tickerCoin = tickerCoins.get(doc.C);
            if (typeof tickerCoin === "undefined" || doc.C !== tickerCoin.coin) {
              return false;
            }

            // PTla = lowestAsk : l
            doc.PTla = parseFloat(tickerCoin.s);
            // PThb = highestBid : h
            doc.PThb = parseFloat(tickerCoin.b);

            // PBd: paribu binance diff
            doc.PBd = ((doc.PThb - doc.T) * 100/doc.T); // (ALIS-TRY).100/TRY
            // BPd: binance paribu diff
            doc.BPd = ((doc.T - doc.PTla) * 100/doc.PTla); // (TRY-SATIS).100/SATIS
          });

          return rdb.save('coins', coins)
            .then((result) => {
              // return console.log('{Paribu} coins updated', result.replaced);
            })
            .catch((error) => {
              return console.log(error);
            });
        })
        .catch((error) => {
          return console.error(error);
        });
    })
    .catch((error) => {
      // console.error(error);
      return console.log('PARIBU HAS SOME PROBLEMS, YOU SHOULD LOOK AT IT');
    });
}, 1000);
