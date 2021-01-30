const LogModel = require('../../models/log.document');
const log = require('../../helpers/log');

module.exports.index = function (req, res, next) {
  LogModel.find()
    .sort({createdAt: -1})
    .then((logs) => {
      res.json({
        statusCode: 200,
        status: true,
        data: logs,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.show = function (req, res, next) {
  LogModel.findOneById(req.params.id, function (error, doc) {
    if (error || doc === null) {
      return next(error);
    }

    res.json({statusCode: 200, status: true, datum: doc});
  });
};

module.exports.delete = function (req, res) {
  LogModel.deleteOne({_id: req.params.id}, function (error) {
    if (error) {
      res.status(404).json({statusCode: 404, status: false, message: global.lang("Not Found!")});
    } else {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'log@delete',
        user: req.user,
        desc: `Log deleted.`,
      });

      res.json({statusCode: 200, status: true, message: global.lang('Successful deleted data.')});
    }
  });
};
