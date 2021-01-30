const rdb = require('../../connect/rdb');
const log = require('../../helpers/log');

module.exports.index = async function (req, res, next) {
  rdb.notifications(parseInt(req.body.page) || 1)
    .then((notifications) => {
      rdb.counts('notifications')
        .then((counts) => {
          res.json({
            statusCode: 200,
            status: true,
            pageNum: parseInt(req.body.page) || 1,
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

module.exports.show = function (req, res, next) {
  rdb.show('notifications', req.params.id)
    .then((notification) => {
      res.json({statusCode: 200, status: true, datum: notification});
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.delete = function (req, res, next) {
  rdb.destroyById('notifications', req.params.id)
    .then((doc) => {
      if (doc.deleted > 0) {
        res.json({statusCode: 200, status: true, message: global.lang('Successful deleted notification-PAYLASMA.')});
      } else {
        res.status(404).json({statusCode: 404, status: false, message: global.lang("Not Found!")});
      }
    })
    .catch((error) => next(error));
};

module.exports.deleteAll = function (req, res, next) {
  rdb.deleteAll('notifications')
    .then(() => {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'notification-PAYLASMA@delete',
        user: req.user,
        desc: `Notification deleted.`,
      });

      res.json({statusCode: 200, status: true, message: global.lang('Successful deleted notification-PAYLASMA.')});
    })
    .catch((error) => next(error));
};
