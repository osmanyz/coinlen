const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

const setUserPassword = (user, options) => {
  if (!user.changed('password')) {
    return;
  }

  return bcrypt.hash(user.password, SALT_FACTOR, function (err, hash) {
    if (!err) {
      return;
    }

    user.setDataValue('password', hash);
  });
};

module.exports = {
  bcrypt: bcrypt,
  SALT_FACTOR: SALT_FACTOR,
  setUserPassword: setUserPassword,
};
