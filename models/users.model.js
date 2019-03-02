const bcrypt = require('bcrypt');

module.exports = (Sequelize, sequelize) => {
  const UserModel = sequelize.define(
    'user',
    {
      lastSeenPriority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      lastUpdate: {
        type: Sequelize.DATE,
        allowNull: new Date(),
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      newWordsPerSession: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      password: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
    },
  );

  UserModel.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hashSync(user.password, 10);
  });

  UserModel.prototype.checkPassword = async (user, password) => {
    const hash = user.password;
    return bcrypt.compare(password, hash);
  };

  return UserModel;
};
