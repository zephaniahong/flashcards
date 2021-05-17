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

  const allSessionCards = async (req, res) => {
    const { userId } = req.cookies;
    const { deckId } = req.params;
    // get all sessions of a user for the specified deck id
    try {
      // all sessions for specified deck
      const sessions = await db.Session.findAll({
        where: {
          [Op.and]: [
            { deckId },
            { userId },
          ],
        },
      });

      // reduce array of objects to array of session ids
      const sessionIds = sessions.map((session) => session.id);
      // get all session cards in the array of session ids
      const allSessionCards = await db.SessionCard.findAll({
        where: {
          sessionId: sessionIds,
        },
      });

      res.send(allSessionCards);
    } catch (err) {
      console.log(err);
    }
  };
  return { newSessionCard, sessionInfo, allSessionCards };
}
