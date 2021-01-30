const {Payment, User} = require('../../models');
const rdb = require('../../connect/rdb');

module.exports.index = async function (req, res, next) {
  const userCount = await User.count();
  const paymentCount = await Payment.count();

  rdb.counts('coins')
    .then((coinsCount) => {
      rdb.counts('coins_format')
        .then((coinsFormatCount) => {
          res.json({
            statusCode: 200,
            status: true,
            data: {
              coins: coinsCount,
              coinsFormat: coinsFormatCount,
              users: userCount,
              payments: paymentCount,
            },
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
