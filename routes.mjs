import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/user.mjs';
import initDecksController from './controllers/deck.mjs';
import initSessionsController from './controllers/session.mjs';
import initSessionCardsController from './controllers/sessionCard.mjs';
import initCardsController from './controllers/card.mjs';

export default function routes(app) {
  const UsersController = initUsersController(db);
  const DecksController = initDecksController(db);
  const SessionsController = initSessionsController(db);
  const SessionCardsController = initSessionCardsController(db);
  const CardsController = initCardsController(db);

  // special JS page. Include the webpack index.html file
  app.get('/dashboard/:id', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // login page
  app.get('/login', UsersController.login);

  // verify login details are correct
  app.post('/login', UsersController.verifyLogin);

  // get user info
  app.get('/userInfo', UsersController.userInfo);

  // get user stats
  app.get('/studydecks', DecksController.studyDecks);

  // create new session
  app.post('/createSession/:deckId', SessionsController.createSession);

  // get relevant deck and cards
  app.get('/deck/:deckId', DecksController.deck);

  // get length of deck
  app.get('/deckLength/:deckId', DecksController.deckLength);

  // get all info of all session cards from single session
  app.get('/sessionInfo/:sessionId', SessionCardsController.sessionInfo);

  // update user's familiarity for a specific card
  app.post('/sessionCard/:sessionId/:cardId/:familiarity', SessionCardsController.newSessionCard);

  app.get('/allSessions/:deckId', SessionsController.allSessions);

  app.get('/logout', UsersController.logout);
}
