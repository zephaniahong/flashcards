export default function initSessionCardModel(sequelize, DataTypes) {
  return sequelize.define(
    'session_card',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      familiarity: {
        type: DataTypes.INTEGER,
      },
      cardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cards',
          key: 'id',
        },
      },
      sessionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sessions',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
