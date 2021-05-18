import sequelizePackage from 'sequelize';

const { Op } = sequelizePackage;

export default function initSessionsController(db) {
  const createSession = async (req, res) => {
    const { deckId } = req.params;
    const { userId } = req.cookies;
    const session = await db.Session.create(
      {
        deckId,
        userId,
        mastery: null,
        time: null,
      },
    );
    res.send({ session });
  };

  const allSessions = async (req, res) => {
    const { deckId } = req.params;
    const { userId } = req.cookies;
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

      // get all card ids of specified deck
      const cards = await db.Card.findAll({
        where: {
          deckId,
        },
      });

      // reduce array of objects to array of card ids
      const cardIds = cards.map((card) => card.id);

      const mastery = {};
      // map out an object with cardId as the key and max familiarity as value
      for (let i = 0; i < cardIds.length; i += 1) {
        for (let j = allSessionCards.length - 1; j >= 0; j -= 1) {
          if (cardIds[i] === allSessionCards[j].cardId) {
            mastery[cardIds[i]] = allSessionCards[j].familiarity;
            break;
          }
        }
      }
      res.send(mastery);
    } catch (err) {
      console.log(err);
    }
  };
  return { createSession, allSessions };
}
