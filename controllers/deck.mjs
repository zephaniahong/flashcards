import sequelizePackage from 'sequelize';

const { Op } = sequelizePackage;

export default function initDecksController(db) {
  const studyDecks = async (req, res) => {
    const decks = await db.Deck.findAll();
    res.send(decks);
  };

  return {
    studyDecks,
  };
}
