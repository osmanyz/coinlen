require('dotenv').config();
const redis = require('../connect/redis');
const rdb = require('../connect/rdb');
const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');

/**
 * For more details
 *
 * https://binance-docs.github.io/apidocs/spot/en/#change-log
 */

const rws = new ReconnectingWebSocket('wss://stream.binance.com:9443/ws/!ticker@arr', [], {
  WebSocket: WS,
});
/**
 {
  e: '24hrTicker',          // Event type
  E: 1605276937848,         // Event time
  s: 'BTCUSDT',             // Symbol
  p: '233.74000000',        // Price change
  P: '1.459',               // Price change percent
  w: '16202.39282074',      // Weighted average price
  x: '16021.59000000',      // First trade(F)-1 price (first trade before the 24hr rolling window)
  c: '16255.33000000',      // Last price
  Q: '0.01403300',          // Last quantity
  b: '16255.32000000',      // Best bid price
  B: '2.15694700',          // Best bid quantity
  a: '16255.33000000',      // Best ask price
  A: '6.99140600',          // Best ask quantity
  o: '16021.59000000',      // Open price
  h: '16480.00000000',      // High price
  l: '15828.60000000',      // Low price
  v: '91037.74665900',      // Total traded base asset volume
  q: '1475029332.88382038', // Total traded quote asset volume
  O: 1605190537790,         // Statistics open time
  C: 1605276937790,         // Statistics close time
  F: 462871530,             // First trade ID
  L: 464281328,             // Last trade Id
  n: 1409799,               // Total number of trades
}
*/

rws.addEventListener('message', (tickers) => {
  redis.get('COINS_24H', function (err, coins24H) {
    if (err) {
      console.log('err', err);
      return false;
    }

    coins24H = JSON.parse(coins24H);

    redis.get('COINS_1H', function (err, coins1H) {
      if (err) {
        console.log('err', err);
        return false;
      }

      coins1H = JSON.parse(coins1H);

      tickers = JSON.parse(tickers.data);
      // console.log('BINANCE.COM >> Working on progress for Binance');
      redis.get('CURRENCY', function (err, currency) {
        currency = parseFloat(currency);

        rdb.findAll('coins')
          .then((coins) => {
            coins.forEach((doc) => {
              let tickerCoin = tickers.find(c => c.s === doc.C+'USDT');
              if (typeof tickerCoin === "undefined" || doc.C+'USDT' !== tickerCoin.s) {
                return false;
              }

              let coin1HPrice = coins1H.filter((p) => p.coin+'USDT' === tickerCoin.s);
              if (typeof coin1HPrice === "object" && coin1HPrice.length > 0) {
                coin1HPrice = coin1HPrice[0];
                doc.G1H = ((parseFloat(tickerCoin.c)) - parseFloat(coin1HPrice.price)) * 100 / parseFloat(coin1HPrice.price);
              }

              let coin24HPrice = coins24H.filter((p) => p.coin+'USDT' === tickerCoin.s);
              if (typeof coin24HPrice === "object" && coin24HPrice.length > 0) {
                coin24HPrice = coin24HPrice[0];
                doc.G24H = ((parseFloat(tickerCoin.c)) - parseFloat(coin24HPrice.price)) * 100 / parseFloat(coin24HPrice.price);
              }

              doc.UP = parseFloat(doc.U);
              doc.U = parseFloat(tickerCoin.c);
              doc.T = (currency ? parseFloat(tickerCoin.c) * parseFloat(currency) : parseFloat(tickerCoin.c));
              doc.CR = currency ? parseFloat(currency) : parseFloat(tickerCoin.c);
              doc.D = Date.now();
            });

            return rdb.save('coins', coins)
              .then((result) => {
                // return console.log('Binance coins updated.', result.replaced);
              })
              .catch((error) => {
                return console.log(error);
              });
          })
          .catch((error) => {
            return console.error(error);
          });
      });



    });
  });
});
