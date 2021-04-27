import sequelizePackage from 'sequelize';
import jsSHA from 'jssha';

const { Op } = sequelizePackage;

export default function initGamesController(db) {
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
          res.cookie('playerId', user.dataValues.id);
          res.redirect(`/dashboard/${user.dataValues.id}`);
        }
      } else {
        res.send('Invalid credentials');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    login, verifyLogin,
  };
}
