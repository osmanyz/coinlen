const rdb = require('../../connect/rdb');

module.exports.index = async function (req, res, next) {
  let pageNum = parseInt(req.body.page) || 1;

  rdb.notifications(pageNum)
    .then((notifications) => {
      rdb.counts('notifications')
        .then((counts) => {
          res.json({
            statusCode: 200,
            status: true,
            pageNum: pageNum,
            total: notifications.length,
            count: counts,
            data: notifications,
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.latest = async function (req, res, next) {
  rdb.notificationsLatest()
    .then((notifications) => {
      res.json({
        statusCode: 200,
        status: true,
        total: notifications.length,
        latest: notifications,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.show = function (req, res, next) {
  rdb.show('notifications', req.params.id)
    .then((notification) => {
      res.json({statusCode: 200, status: true, datum: notification});
    })
    .catch((error) => {
      next(error);
    });
};
