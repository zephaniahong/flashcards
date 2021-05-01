import sequelizePackage from 'sequelize';

const { Op } = sequelizePackage;

export default function initSessionCardsController(db) {
  const newSessionCard = async (req, res) => {
    const { sessionId, cardId, familiarity } = req.params;
    // create new row in session card db
    const sessionCard = await db.SessionCard.create(
      {
        cardId,
        familiarity,
        sessionId,
      },
    );
  };
  return { newSessionCard };
}
