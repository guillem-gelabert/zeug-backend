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
        allowNull: false,
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
    },
  );
  return UserModel;
};
