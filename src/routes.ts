import { Router, Request, Response } from 'express';
import { saveUser, login, forgotPassword } from './controller/UserController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});

routes.post('/users', saveUser);
routes.post('/session', login);
routes.post('/forgot', forgotPassword);
export default routes;
