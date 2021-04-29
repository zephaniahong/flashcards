import sequelizePackage from 'sequelize';

const { Op } = sequelizePackage;

export default function initDecksController(db) {
  // all decks
  const studyDecks = async (req, res) => {
    const decks = await db.Deck.findAll();
    res.send(decks);
  };

  // get all cards from a single deck
  const deck = async (req, res) => {
    const { deckId } = req.params;
    console.log('i am deck id ', deckId);
    try {
      const cards = await db.Deck.findOne({
        where: {
          id: deckId,
        },
        include: {
          model: db.Card,
        },
      });
      res.send(cards);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    studyDecks, deck,
  };
}
