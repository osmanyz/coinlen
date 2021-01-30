'use strict';
const {bcrypt, SALT_FACTOR} = require('../../helpers/password');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const token = (
      [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('') +
      [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    );
    if (process.env.NODE_ENV === 'development') {
      await queryInterface.bulkInsert('users', [{
        role: 'admin',
        email: 'admin@admin.com',
        name: 'Osman',
        password: bcrypt.hashSync('admin', SALT_FACTOR),
        phone: '5301234567',
        status: true,
        premium_status: true,
        premium: 'business',
        premium_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        token: token
      }]);
    } else {
      await queryInterface.bulkInsert('users', [{
        role: 'admin',
        email: 'admin@admin.com',
        name: 'Osman',
        password: bcrypt.hashSync('password', SALT_FACTOR),
        phone: '5301234567',
        status: true,
        premium_status: true,
        premium: 'business',
        premium_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        token: token
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('users', {email: 'admin@admin.com'}, {});
     await queryInterface.bulkDelete('users', {email: 'osman@coinlen.com'}, {});
  }
};
