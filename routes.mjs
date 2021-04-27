import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/user.mjs';

export default function routes(app) {
  const UsersController = initUsersController(db);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  // login page
  app.get('/login', UsersController.login);
  // verify login details are correct
  app.post('/login', UsersController.verifyLogin);
}
