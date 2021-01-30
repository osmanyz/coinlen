const SequelizePaginate = require('sequelize-paginate');
const {bcrypt, setUserPassword, SALT_FACTOR} = require('../helpers/password');

const roles = {
  admin: "admin",
  user: "user",
};

const packages = {
  promotion: 'promotion',
  trial: 'trial',
  economic: 'economic',
  premium: 'premium',
  business: 'business',
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role: {
      type: DataTypes.STRING,
      defaultValue: roles.user,
      allowNull: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set: function (value) {
        if (value) {
          return this.setDataValue('password', bcrypt.hashSync(value, SALT_FACTOR));
        }
      }
    },
    emailActivation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    emailActivationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    premium: {
      type: DataTypes.STRING,
      defaultValue: packages.trial,
      allowNull: true,
    },
    premiumDate: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      allowNull: true,
    },
    premiumStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    notificationSound: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      default: 'tr',
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'users',
    paranoid: true,
    hooks: {
      beforeSave: setUserPassword
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Payment, {foreignKey: 'user_id', as: 'payment'});
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.roles = function (role = null) {
    if (role) {
      if (typeof roles[role] !== "undefined") {
        return roles[role];
      }

      return null;
    }

    return roles;
  };

  SequelizePaginate.paginate(User);

  return User;
};
