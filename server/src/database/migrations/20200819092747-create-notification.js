'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provider: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DECIMAL(12,2)
      },
      name: {
        type: Sequelize.STRING
      },
      coin: {
        type: Sequelize.JSON
      },
      format: {
        type: Sequelize.JSON
      },
      sms: {
        allowNull: true,
        type: Sequelize.DATE
      },
      telegram: {
        allowNull: true,
        type: Sequelize.DATE
      },
      email: {
        allowNull: true,
        type: Sequelize.DATE
      },
      read: {
        allowNull: true,
        type: Sequelize.DATE
      },
      date: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  }
};
