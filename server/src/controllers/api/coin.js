const rdb = require('../../connect/rdb');

module.exports.main = async function (req, res, next) {
  rdb.findAll('currency')
    .then((currency) => {
      rdb.findAll('coins', 'position')
        .then((coins) => {
          res.json({
            statusCode: 200,
            status: true,
            currency: currency[0],
            data: coins,
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports.coins = function (req, res, next) {
  rdb.findAll('coins', 'position')
    .then((coins) => {
      res.json({
        statusCode: 200,
        status: true,
        data: coins,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.coinsFormat = function (req, res, next) {
  rdb.findAll('coins_format', 'position')
    .then((formats) => {
      res.json({
        statusCode: 200,
        status: true,
        formats: formats,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.coinHistory = function (req, res, next) {
  rdb.getCoinsHistories(req.params.id)
    .then((history) => {
      res.json({
        statusCode: 200,
        status: true,
        history: history,
      });
    })
    .catch((error) => {
      next(error);
    });
};

