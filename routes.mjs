import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/user.mjs';
import initDecksController from './controllers/deck.mjs';

export default function routes(app) {
  const UsersController = initUsersController(db);
  const DecksController = initDecksController(db);

  // special JS page. Include the webpack index.html file
  app.get('/dashboard/:id', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // login page
  app.get('/login', UsersController.login);
  // verify login details are correct
  app.post('/login', UsersController.verifyLogin);

  // get user stats
  app.get('/studydecks', DecksController.studyDecks);
}
