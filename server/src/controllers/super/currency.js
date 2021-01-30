const redis = require('../../connect/redis');
const log = require('../../helpers/log');

module.exports.show = async function (req, res, next) {
  redis.get('CURRENCY', function (error, currency) {
    if (error) {
      return next(error);
    }

    res.json({
      statusCode: 200,
      status: true,
      data: JSON.parse(currency)
    });
  })
};

module.exports.update = function (req, res, next) {
  redis.get('CURRENCY', function (error, currency) {
    if (!error) {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'currency@update',
        user: req.user,
        desc: `Currency updated. Current Value: ${currency} | New Value: ${req.body.currency}`,
      });
    }
  });

  redis.set('AUTO_UPDATE', req.body.autoUpdate ? 1 : 0);
  redis.set('CURRENCY', req.body.currency);

  res.json({
    statusCode: 200,
    status: true,
    data: req.body.currency
  });
};

