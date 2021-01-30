const SequelizePaginate = require('sequelize-paginate');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Notification.init({
    provider: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    value: DataTypes.DECIMAL(12, 2),
    name: DataTypes.STRING,
    coin: {
      type: DataTypes.JSON,
      get() {
        if (this.getDataValue('coin')) {
          return JSON.parse(this.getDataValue('coin'));
        }
        return this.getDataValue('coin');
      },
      set(value) {
        return this.setDataValue("coin", JSON.stringify(value));
      }
    },
    format: {
      type: DataTypes.JSON,
      get() {
        if (this.getDataValue('format')) {
          return JSON.parse(this.getDataValue('format'));
        }
        return this.getDataValue('format');
      },
      set(value) {
        return this.setDataValue("format", JSON.stringify(value));
      }
    },
    telegram: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    read: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: false,
    paranoid: true,
  });

  SequelizePaginate.paginate(Notification);

  return Notification;
};
