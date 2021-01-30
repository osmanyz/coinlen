require('dotenv').config();
const path = require('path');

const config = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    underscored: true,
    underscoredAll: true,
  },
};

module.exports = {
  db: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    options: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dialect: 'mysql',
      define: {
        paranoid: true,
        underscored: true,
        underscoredAll: true,
      },
      logging: false,
      "models-path": path.join(__dirname, "../src/models"),
      "migrations-path": path.join(__dirname, "../src/database/migrations"),
      "seeders-path": path.join(__dirname, "../src/database/seeders"),
    }
  },
  development: {
    ...config
  },
  test: {
    ...config
  },
  production: {
    ...config
  }
};
