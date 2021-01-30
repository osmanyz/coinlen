const momentTZ = require('moment-timezone');
const rdb = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
});

module.exports.r = rdb;

// coins
module.exports.tickerCoins = async function () {
  return rdb.table('coins').changes().run();
};

module.exports.findAll = async function (tableName) {
  return rdb.table(tableName).orderBy(rdb.asc('PS')).run();
};

module.exports.getAllCoins = async function (coins) {
  return rdb.table('coins')
    .getAll(...coins, {index: 'C'})
    .orderBy(rdb.asc('PS')).run();
};

module.exports.getCoinFormats = async function () {
  return rdb.table('coins_format').orderBy(rdb.desc('D')).run();
};

module.exports.getCoinFormat = async function (coin) {
  return rdb.table('coins_format').filter(rdb.row('C').eq(coin)).orderBy(rdb.desc('D')).limit(1).run();
};

module.exports.edit = async function (tableName, id, object) {
  return rdb.table(tableName).get(id).update(object).run();
};

module.exports.save = async function (tableName, object) {
  return rdb.table(tableName).insert(object, {conflict: 'update'}).run();
};

module.exports.saveNoConflict = async function (tableName, object) {
  return rdb.table(tableName).insert(object).run();
};

module.exports.deletePastCoinsHistory = async function () {
  const time = momentTZ.tz(Date.now(), process.env.TZ).subtract(70, 'seconds').unix();

  return rdb.table('coins_history').filter(rdb.row('D').lt(time * 1000)).delete().run();
};

// currency
module.exports.currency = async function () {
  return rdb.table('currency').run();
};

module.exports.currencyChanges = async function () {
  return rdb.table('currency').changes().run();
};

// notifications
module.exports.opportunityCoinsProviderOne = async function (BUYING, SELLING) {
  // LT: <    LE: <=
  // GT: >    GE: >=
  return rdb.table('coins')
    .filter(rdb.or(rdb.row("PBd").lt(BUYING), rdb.row("PDb").ge(SELLING)))
    .run();
};
module.exports.opportunityCoinsProviderTwo = async function (BUYING, SELLING) {
  // LT: <    LE: <=
  // GT: >    GE: >=
  return rdb.table('coins')
    .filter(rdb.or(rdb.row("BPd").lt(BUYING), rdb.row("BPd").ge(SELLING)))
    .run();
};

module.exports.notifications = async function () {
  return rdb.table('notifications').run();
};

module.exports.notificationsChanges = async function () {
  return rdb.table('midnight_coins').changes().run();
};

module.exports.notificationsByFiltered = async function () {
  const fiveMinuteAgo = (new Date(Date.now() - 1000 * 60 * 10)).getTime();

  return rdb.table('notifications')
    .filter(rdb.row("date").ge(fiveMinuteAgo))
    .orderBy(rdb.desc('date'))
    .run();
};

module.exports.saveNotification = async function (object) {
  const types = {
    BUY: 1,
    SELL: 2,
  };
  console.log('notifications.save is working', object);

  return rdb.table('notifications').insert(object).run();
};
