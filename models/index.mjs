import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initCardModel from './card.mjs';
import initDeckModel from './deck.mjs';
import initSessionModel from './session.mjs';
import initSessionCardModel from './sessionCard.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Card = initCardModel(sequelize, Sequelize.DataTypes);
db.Deck = initDeckModel(sequelize, Sequelize.DataTypes);
db.Session = initSessionModel(sequelize, Sequelize.DataTypes);
db.SessionCard = initSessionCardModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.Session.belongsToMany(db.Card, { through: db.SessionCard });
db.Card.belongsToMany(db.Session, { through: db.SessionCard });

db.User.hasMany(db.Session);
db.Session.belongsTo(db.User);

db.Deck.hasMany(db.Session);
db.Session.belongsTo(db.Deck);

db.Deck.hasMany(db.Card);
db.Card.belongsTo(db.Deck);

db.Session.hasMany(db.SessionCard);
db.SessionCard.belongsTo(db.Session);
db.Card.hasMany(db.SessionCard);
db.SessionCard.hasMany(db.Card);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
