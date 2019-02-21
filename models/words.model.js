module.exports = (Sequelize, sequelize) => {
  const WordModel = sequelize.define(
    'word',
    {
      article: {
        type: Sequelize.ENUM('der', 'die', 'das'),
        allowNull: false,
      },
      substantive: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 'UNSEEN',
      },
    },
  );
  return WordModel;
};
