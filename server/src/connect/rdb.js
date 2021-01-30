const rdb = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
});

module.exports.findAll = async function (tableName, orderBy, limit) {
  if (orderBy && limit) {
    return rdb.table(tableName).orderBy(orderBy).limit(limit).run();
  }
  if (orderBy) {
    return rdb.table(tableName).orderBy(orderBy).run();
  }
  return rdb.table(tableName).run();
};

module.exports.findBy = async function (tableName, fieldName, value) {
  return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).run();
};

module.exports.findByWithOrder = async function (tableName, fieldName, value, orderBy) {
  return rdb.table(tableName).orderBy(orderBy).filter(rdb.row(fieldName).eq(value)).run();
};

module.exports.findIndexed = function (tableName, query, index) {
  return rdb.table(tableName).getAll(query, {index: index}).run()
    .then(function (cursor) {
      return cursor.toArray();
    });
};

module.exports.counts = async function (tableName) {
  return rdb.table(tableName).count().run();
};

module.exports.show = async function (tableName, id) {
  return rdb.table(tableName).get(id).run();
};

module.exports.edit = async function (tableName, id, object) {
  return rdb.table(tableName).get(id).update(object).run();
};

module.exports.save = async function (tableName, object) {
  return await rdb.table(tableName).insert(object, {conflict: 'update'}).run();
};

module.exports.destroy = async function (tableName, coin) {
  return rdb.table(tableName).filter({"C": coin}).delete().run();
};

module.exports.destroyById = async function (tableName, id) {
  return rdb.table(tableName).get(id).delete().run();
};
module.exports.destroyByCoinName = async function (tableName, coin) {
  return rdb.table(tableName).filter({"C": coin}).delete().run();
};

module.exports.deleteAll = async function (tableName) {
  return rdb.table(tableName).delete().run();
};

module.exports.getCoinsHistories = async function (value) {
  return rdb.table('coins_history').filter(rdb.row('C').eq(value)).orderBy(rdb.desc('D')).limit(30).run();
};

module.exports.notificationsLatest = async function () {
  return rdb.table('notifications')
    .orderBy({index: rdb.desc('date')})
    .limit(6)
    .run();
};

module.exports.notifications = async function (pageNum) {
  return rdb.table('notifications')
    .orderBy({index: rdb.desc('date')})
    .slice(((pageNum - 1) * 36), (pageNum * 36  ))
    .run();
};
