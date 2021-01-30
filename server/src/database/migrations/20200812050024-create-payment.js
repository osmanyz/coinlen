'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        foreignKey: true,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
        allowNull: true,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'USD',
        allowNull: true
      },
      email: {
        type: Sequelize.STRING
      },
      old_premium: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      old_premium_date: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
      },
      old_premium_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
        allowNull: true
      },
      new_premium: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      new_premium_date: {
        type: Sequelize.DATE,
        defaultValue: null,
        allowNull: true
      },
      new_premium_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING
      },
      charge_id: {
        type: Sequelize.STRING
      },
      charge: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('payments');
  }
};
