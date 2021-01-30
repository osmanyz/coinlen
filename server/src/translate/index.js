const en = require('./en.json');

const lang = (key) => {
  return en[key];
};

module.exports = lang;

