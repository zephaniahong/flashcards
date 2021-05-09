import sequelizePackage from 'sequelize';
import jsSHA from 'jssha';

const { Op } = sequelizePackage;

export default function initUsersController(db) {
  const login = async (req, res) => {
    res.render('login');
  };

  const verifyLogin = async (req, res) => {
    const { email, password } = req.body;
    // get password of user from db
    try {
      const user = await db.User.findOne({
        where: { email },
      });
      // if email exists in the db
      if (user) {
      // check if password input is same as db
        const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
        shaObj.update(password);
        const hashedPassword = shaObj.getHash('HEX');
        if (hashedPassword === user.dataValues.password) {
          res.cookie('userId', user.dataValues.id);
          res.redirect(`/dashboard/${user.dataValues.id}`);
        }
      } else {
        res.send('Invalid credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userInfo = async (req, res) => {
    const { userId } = req.cookies;
    const user = await db.User.findByPk(userId);
    // get all sessions the user has been in
    const allSessions = await db.Session.findAll({
      where: {
        userId,
      },
      include: [db.SessionCard],
    });
    const sessionArray = allSessions.map((session) => session.id);

    // count number of cards user has studied
    const cardCount = await db.SessionCard.count({
      where: {
        sessionId: sessionArray,
      },
    });
    res.send({ user, cardCount });
  };

  const logout = async (req, res) => {
    res.clearCookie('userId');
  };
  return {
    login, verifyLogin, userInfo, logout,
  };
}
