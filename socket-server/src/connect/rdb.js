const rdb = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
});

module.exports.r = rdb;

module.exports.tickerCoins = async function () {
  return rdb.table('coins')
    .orderBy(rdb.asc('PS'))
    .pluck(
      'I', 'D', 'C', 'U', 'T', 'CR', 'UP', 'G1H', 'G24H',
      'PTla', 'PThb', 'PBd', 'BPd',
      'BTla', 'BThb', 'BBd', 'BBTd'
    )
    .run();
};
