require('dotenv').config();
const rdb = require('../connect/rdb');

setInterval(function () {
  // console.log('~Every two seconds data is working....');
  rdb.findAll('coins')
    .then((coins) => {
      coins.filter((c) => delete c.id);
      return rdb.saveNoConflict('coins_history', coins)
        .then((result) => {
          return console.log('&&Coins history updated.', result.inserted);
        })
        .catch((error) => {
          return console.log(error);
        });
    })
    .catch((error) => {
      return console.error(error);
    });
}, 2000);

setInterval(function () {
  // console.log('***** 10 process is worked');
  rdb.deletePastCoinsHistory()
    .then((d) => {
      console.log('********* deleted is success', d.deleted, 'skipped', d.skipped);
    })
    .catch((error) => {
      return console.error(error);
    });
}, 10000);
