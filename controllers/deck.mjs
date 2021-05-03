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

  const deckLength = async (req, res) => {
    const { deckId } = req.params;
    const deck = await db.Deck.findOne({
      where: {
        id: deckId,
      },
      include: [db.Card],
    });
    const { length } = deck.cards;
    res.send({ length });
  };

  return {
    studyDecks, deck, deckLength,
  };
}
