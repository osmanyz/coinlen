const rdb = require('../../connect/rdb');
const log = require('../../helpers/log');

module.exports.index = function (req, res, next) {
  rdb.findAll('coins', 'PS')
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

module.exports.create = function (req, res, next) {
  rdb.findBy('coins', 'C', req.body.C)
    .then((show) => {
      if (show.length > 0) {
        return res.status(500).json({statusCode: 500, status: false, message: global.lang("Coin already exists!")});
      }

      const create = {
        PS: parseInt(req.body.PS),
        I: parseInt(req.body.I),
        N: req.body.N,
        C: req.body.C,
        U: 0.00,
        T: 0.00,
        CR: 0.00,
        UP: null,
        G1H: null,
        G12H: null,
        G24H: null,
        G7D: null,
        D: Date.now(),
        // paribu
        PTla: 0.00, // price_try_paribu_lowest_ask
        PThb: 0.00, // price_try_paribu_highest_bid
        BPd: 0.00, // binance_paribu_difference
        PBd: 0.00, // paribu_binance_difference
        // btcturk
        BTla: 0.00, // price_try_btcturk_lowest_ask
        BThb: 0.00, // price_try_btcturk_highest_bid
        BBTd: 0.00, // binance_btcturk_difference
        BBd: 0.00, // btcturk_binance_difference
      };

      rdb.save('coins', create)
        .then(function (error, create) {
          log({
            req: req,
            type: 'success',
            path: 'admin',
            method: 'coin@create',
            user: req.user,
            desc: `Coin created. Coin: ${req.body.C}`,
          });

          res.json({statusCode: 200, status: true, message: global.lang('Successful created new coin.')});
        })
        .catch((error) => {
          return res.status(500).json({statusCode: 500, status: false, message: global.lang("Coin already exists!")});
        });
    })
    .catch((error) => {
      return res.status(500).json({statusCode: 500, status: false, message: global.lang("Coin already exists!")});
    });
};

module.exports.show = function (req, res, next) {
  rdb.show('coins', req.params.id)
    .then((doc) => {
      res.json({statusCode: 200, status: true, data: doc});
    })
    .catch((error) => next(error));
};

module.exports.edit = function (req, res, next) {
  rdb.show('coins', req.params.id)
    .then((doc) => {
      doc.PS = parseInt(req.body.PS);
      doc.I = parseInt(req.body.I);
      doc.N = req.body.N;
      doc.C = req.body.C;
      doc.U = 0.00;
      doc.T = 0.00;
      doc.CR = 0.00;
      doc.UP = null;
      doc.G1H = null;
      doc.G12H = null;
      doc.G24H = null;
      doc.G7D = null;
      doc.D = Date.now();
      // paribu
      doc.PTla = 0.00; // price_try_paribu_lowest_ask
      doc.PThb = 0.00; // price_try_paribu_highest_bid
      doc.BPd = 0.00; // binance_paribu_difference
      doc.PBd = 0.00; // paribu_binance_difference
      // btcturk
      doc.BTla = 0.00; // price_try_btcturk_lowest_ask
      doc.BThb = 0.00; // price_try_btcturk_highest_bid
      doc.BBTd = 0.00; // binance_btcturk_difference
      doc.BBd = 0.00; // btcturk_binance_difference

      rdb.edit('coins', doc.id, doc)
        .then(function () {
          log({
            req: req,
            type: 'success',
            path: 'admin',
            method: 'coin@edit',
            user: req.user,
            desc: `Coin edited. Coin: ${doc.C}`,
          });

          res.json({statusCode: 200, status: true, message: global.lang('Successful updated coin.')});
        })
        .catch((error) => {
          return res.status(500).json({statusCode: 500, status: false, message: global.lang("Coin already exists!")});
        });
    })
    .catch((error) => next(error));
};

module.exports.delete = function (req, res, next) {
  rdb.destroyById('coins', req.params.id).then((doc) => {
    if (doc.deleted > 0) {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'coin@delete',
        user: req.user,
        desc: `Coin deleted. Id: ${req.params.id}`,
      });

      res.json({statusCode: 200, status: true, message: global.lang('Successful deleted coin.')});
    } else {
      res.status(404).json({statusCode: 404, status: false, message: global.lang("Not Found!")});
    }
  })
    .catch((error) => next(error));
};
