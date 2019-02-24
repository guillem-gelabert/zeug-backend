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
    {
      timestamps: false,
    },
  );

  WordModel.getNewWords = async (lastSeenPriority, newWordsPerSession) => WordModel.findAll({
    where: {
      priority: {
        [Sequelize.Op.between]: [lastSeenPriority, newWordsPerSession],
      },
    },
  });

  return WordModel;
};
