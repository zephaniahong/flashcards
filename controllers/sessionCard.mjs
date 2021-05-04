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
    res.sendStatus(200);
  };

  const sessionInfo = async (req, res) => {
    const { sessionId } = req.params;
    try {
      const allSessionCards = await db.SessionCard.findAll(
        {
          where: {
            sessionId,
          },
        },
      );
      res.send(allSessionCards);
    } catch (err) {
      console.log(err);
    }
  };
  return { newSessionCard, sessionInfo };
}
