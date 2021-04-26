export default function initSessionModel(sequelize, DataTypes) {
  return sequelize.define(
    'session',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mastery: {
        type: DataTypes.INTEGER,
      },
      deckId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'decks',
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
