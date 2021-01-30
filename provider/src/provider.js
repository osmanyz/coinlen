/**
 * Just for development env.
 *
 * You can do whatever you want in here.
 */

// providers
require('./providers/binance');
require('./providers/paribu.restful');
require('./providers/btcturk');

// schedules
require('./scheduled/coins-grow');
require('./currency/currency');
// require('./currency/currency-free');
// require('./scheduled/socket-trigger');
// require('./scheduled/coins-history');
