'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      email_activation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      email_activation_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      premium: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'trial'
      },
      premium_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      premium_status: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      agreement: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      notification_sound: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: 'tr',
        allowNull: true,
      },
      ip_address: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      user_agent: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
