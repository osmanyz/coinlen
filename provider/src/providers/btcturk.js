require('dotenv').config();
const rdb = require('../connect/rdb');
const WebSocket = require('ws');

/**
 * For more details
 *
 * https://docs.btcturk.com/#models
 */

const join = JSON.stringify([151, {
  type: 151,
  channel: 'ticker',
  event: 'all',
  join: true
}]);

function heartbeat() {
  client.send(join);

  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    client.send(join);
    this.terminate();
  }, 30000 + 1000);
}

const client = new WebSocket('wss://ws-feed-pro.btcturk.com/');

client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', () => {
  clearTimeout(this.pingTimeout);
});

console.log('Working on progress for [BtcTurk.com]');
client.onmessage = (event) => {
  try {
    listener(event.data);
  } catch (e) {
    console.error(e);
  }
};

/**
 * It messages listener.
 * @param data
 */
function listener(data) {
  data = JSON.parse(data);
  // if (typeof data === "object" && typeof data[0] === "number" && data[0] === 100) {
  //   /// we're in it
  // }

  if (typeof data === "object" && typeof data[0] === "number" && data[0] === 401) {
    /// we're in it
    allTickers(data[1].items);
  }
}

/**
 * All tickers
 * @param tickers
 */
function allTickers(tickers) {
  rdb.findAll('coins')
    .then((coins) => {
      coins.forEach((doc) => {
        let tickerCoin = tickers.find(c => c.PS === doc.C+"TRY");
        if (typeof tickerCoin === "undefined" || doc.C+"TRY" !== tickerCoin.PS) {
          return false;
        }

        // BTla = lowestAsk : B
        doc.BTla = parseFloat(tickerCoin.B);
        // BThb = highestBid : A
        doc.BThb = parseFloat(tickerCoin.A);

        // BBd: btcturk binance diff
        doc.BBd = ((doc.BThb - doc.T) * 100/doc.T); // (ALIS-TRY).100/TRY
        // BBd: binance btcturk diff
        doc.BBTd = ((doc.T - doc.BTla) * 100/doc.BTla); // (TRY-SATIS).100/SATIS
      });

      return rdb.save('coins', coins)
        .then((result) => {
          return console.log('[BtcTurk] coins updated', result.replaced);
        })
        .catch((error) => {
          return console.log(error);
        });
    })
    .catch((error) => {
      return console.error(error);
    });
}
