const rdb = require('../../connect/rdb');
const log = require('../../helpers/log');

module.exports.index = function (req, res, next) {
  rdb.findAll('coins_format', 'PS')
    .then((coinsFormat) => {
      res.json({
        statusCode: 200,
        status: true,
        data: coinsFormat,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.create = function (req, res, next) {
  rdb.findBy('coins_format', 'C', req.body.C)
    .then((show) => {
      if (show.length >= 1) {
        return res.status(500).json({
          statusCode: 500,
          status: false,
          message: global.lang("Coin format already exists!")
        });
      }

      const create = {
        PS: parseInt(req.body.PS),
        I: parseInt(req.body.I),
        C: req.body.C,
        UF: req.body.UF,
        TF: req.body.TF,
        G1Hf: req.body.G1Hf,
        G12Hf: req.body.G12Hf,
        G24Hf: req.body.G24Hf,
        G7Df: req.body.G7Df,
        // paribu
        PTlaf: req.body.PTlaf,
        PThbf: req.body.PThbf,
        BPdf: req.body.BPdf,
        PBdf: req.body.PBdf,
        // btcturk
        BTlaf: req.body.BTlaf,
        BThbf: req.body.BThbf,
        BBTdf: req.body.BBTdf,
        BBdf: req.body.BBdf,
      };

      rdb.save('coins_format', create)
        .then(function () {
          log({
            req: req,
            type: 'success',
            path: 'admin',
            method: 'coinFormat@create',
            user: req.user,
            desc: `Coin format created. Coin: ${req.body.C}`,
          });

          res.json({statusCode: 200, status: true, message: global.lang('Successful created new coin format.')});
        })
        .catch((error) => {
          return res.status(500).json({
            statusCode: 500,
            status: false,
            message: global.lang("Coin format already exists!")
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: global.lang("Coin format already exists!")
      });
    });
};

module.exports.show = function (req, res, next) {
  rdb.show('coins_format', req.params.id)
    .then((doc) => {
      res.json({statusCode: 200, status: true, data: doc});
    })
    .catch((error) => next(error));
};

module.exports.edit = function (req, res, next) {
  rdb.show('coins_format', req.params.id)
    .then((doc) => {
      doc.PS = parseInt(req.body.PS);
      doc.I = parseInt(req.body.I);
      doc.N = req.body.N;
      doc.C = req.body.C;
      doc.UF = req.body.UF;
      doc.TF = req.body.TF;
      doc.G1Hf = req.body.G1Hf;
      doc.G12Hf = req.body.G12Hf;
      doc.G24Hf = req.body.G24Hf;
      doc.G7Df = req.body.G7Df;
      // paribu
      doc.PTlaf = req.body.PTlaf;
      doc.PThbf = req.body.PThbf;
      doc.BPdf = req.body.BPdf;
      doc.PBdf = req.body.PBdf;
      // btcturk
      doc.BTlaf = req.body.BTlaf;
      doc.BThbf = req.body.BThbf;
      doc.BBTdf = req.body.BBTdf;
      doc.BBdf = req.body.BBdf;

      rdb.edit('coins_format', doc.id, doc)
        .then(function () {
          log({
            req: req,
            type: 'success',
            path: 'admin',
            method: 'coinFormat@edit',
            user: req.user,
            desc: `Coin format edited. Coin: ${doc.C}`,
          });

          res.json({statusCode: 200, status: true, message: global.lang('Successful updated coin.')});
        })
        .catch((error) => {
          return res.status(500).json({statusCode: 500, status: false, message: global.lang("Coin already exists!")});
        });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports.delete = function (req, res, next) {
  rdb.destroyById('coins_format', req.params.id)
    .then((doc) => {
      if (doc.deleted > 0) {
        log({
          req: req,
          type: 'success',
          path: 'admin',
          method: 'coinFormat@delete',
          user: req.user,
          desc: `Coin format deleted. Id: ${req.params.id}`,
        });

        res.json({statusCode: 200, status: true, message: global.lang('Successful deleted coin.')});
      } else {
        res.status(404).json({statusCode: 404, status: false, message: global.lang("Not Found!")});
      }
    })
    .catch((error) => next(error));
};

