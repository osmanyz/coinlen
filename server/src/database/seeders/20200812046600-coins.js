'use strict';
const rdb = require('../../connect/rdb');
const myData = require('../../../coins.all.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Realtime database is seeding');

    let coinsSet = new Set();
    let coinsFormatSet = new Set();
    myData.map((item) => {
      coinsSet.add({
        PS: parseInt(item.PS),
        I: parseInt(item.I),
        N: item.N,
        C: item.C,
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
        PBd: 0.00, // price_try_paribu_difference_bitcoin
        BPd: 0.00, // binance_paribu_difference
        // btcturk
        BTla: 0.00, // price_try_btcturk_lowest_ask
        BThb: 0.00, // price_try_btcturk_highest_bid
        BBTd: 0.00, // binance_btcturk_difference
        BBd: 0.00, // btcturk_binance_difference_format
      });

      coinsFormatSet.add({
        PS: parseInt(item.PS),
        I: parseInt(item.I),
        N: item.N,
        C: item.C,
        UF: item.UF, // price_usd_format
        TF: item.TF, // price_try_format

        G1Hf: item.G1Hf, // price_usd_growth_12_hours_format
        G12Hf: item.G12Hf, // price_usd_growth_12_hours_format
        G24Hf: item.G24Hf, // price_usd_growth_24_hours_format
        G7Df: item.G7Df, // price_usd_growth_7_days_format

        PTlaf: item.PTlaf, // price_try_paribu_lowest_ask_format
        PThbf: item.PThbf, // price_try_paribu_highest_bid_format
        BPdf: item.BPdf, // binance_paribu_difference_format
        PBdf: item.PBdf, // paribu_binance_difference_format

        BTlaf: item.BTlaf, // price_try_btcturk_lowest_ask_format
        BThbf: item.BThbf, // price_try_btcturk_highest_bid_format
        BBdf: item.BBdf, // btcturk_binance_difference_format
        BBTdf: item.BBTdf, // binance_btcturk_difference_format
      });
    });

    rdb.deleteAll('coins')
      .then(() => {
        console.log('Deleted all coins');
      })
      .catch((error) => {
        console.log('err', error);
      });
    rdb.deleteAll('coins_format')
      .then(() => {
        console.log('Deleted all coins format');
      })
      .catch((error) => {
        console.log('err', error);
      });

    rdb.save('coins', Array.from(coinsSet))
      .then((save) => {
        console.log('inserted coins');
      })
      .catch((error) => {
        console.log('err', error);
      });

    rdb.save('coins_format', Array.from(coinsFormatSet))
      .then((save) => {
        console.log('inserted coins_format');
      })
      .catch((error) => {
        console.log('err', error);
      });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
