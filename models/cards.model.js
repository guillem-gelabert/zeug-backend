module.exports = (Sequelize, sequelize) => {
  const CardModel = sequelize.define(
    'card',
    {
      wordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stage: {
        type: Sequelize.ENUM('SEEN', 'UNSEEN'),
        allowNull: false,
        defaultValue: 'UNSEEN',
      },
      nextDueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      easiness: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 2.5,
      },
      consecutiveCorrectAnswers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    },
  );
  return CardModel;
};
