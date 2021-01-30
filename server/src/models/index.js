const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const {Sequelize, DataTypes} = require('sequelize');
const filebasename = path.basename(__filename);

const db = {};

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0)
      && (file !== filebasename)
      && (file.slice(-9) === '.model.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// sequelize.sync({force: false}).then(() => {
//   console.log('SEQUELIZE SYNCHRONIZED');
// });

module.exports = db;
