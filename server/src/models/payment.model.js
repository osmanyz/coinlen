const SequelizePaginate = require('sequelize-paginate');
const {statuses, statusesReverse} = require('../helpers/payment-statuses');

/**
 * Statuses
 *
 * 0: charge:created    New charge is created
 * 1: charge:confirmed  Charge has been confirmed and the associated payment is completed
 * 2: charge:failed     Charge failed to complete
 * 3: charge:delayed    Charge received a payment after it had been expired
 * 4: charge:pending    Charge has been detected but has not been confirmed yet
 * 5: charge:resolved   Charge has been resolved
 */
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
      allowNull: true,
      get() {
        return this.getDataValue('currency');
      },
      set(value) {
        return this.setDataValue('currency', value.toUpperCase());
      }
    },
    email: {
      type: DataTypes.STRING,
    },
    oldPremium: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    oldPremiumDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    oldPremiumStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
      allowNull: true,
    },
    newPremium: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    newPremiumDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    newPremiumStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: statuses.started,
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING,
      defaultValue: 'coinbase',
      allowNull: false,
    },
    chargeId: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    charge: {
      type: DataTypes.JSON,
      defaultValue: null,
      allowNull: true,
      get() {
        if (this.getDataValue('charge')) {
          return JSON.parse(this.getDataValue('charge'));
        }
        return this.getDataValue('charge');
      },
      set(value) {
        return this.setDataValue("charge", JSON.stringify(value));
      }
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'payments',
    timestamps: true,
    paranoid: true,
  });

  Payment.associate = function (models) {
    Payment.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
  };

  Payment.prototype.statuses = statuses;
  Payment.prototype.statusesReverse = statusesReverse;
  SequelizePaginate.paginate(Payment);

  return Payment;
};
