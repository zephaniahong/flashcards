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
  };
  return { createSession };
}
