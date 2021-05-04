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
        for (let j = 0; j < allSessionCards.length; j += 1) {
          if (cardIds[i] === allSessionCards[j].cardId) {
            // check if id already exists in mastery
            if (cardIds[i] in mastery) {
              // if id in mastery and familiarity is 3, break out of for loop
              if (allSessionCards[j].familiarity === 3) {
                mastery[cardIds[i]] = 3;
                break;
              }
              // check if familiarity greater than what is in mastery
              else if (allSessionCards[j].familiarity > mastery[cardIds[i]]) {
                mastery[cardIds[i]] = allSessionCards[j].familiarity;
              }
            }
            else {
              mastery[cardIds[i]] = allSessionCards[j].familiarity;
            }
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
