import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import UserController from '../user/user.controller';

const routes = Router();

routes.get('/users', new UserController().all);
routes.get('/users/:id', new UserController().find);
routes.put('/users/:id', new UserController().update);
routes.post('/users', new UserController().store);
routes.delete('/users/:id', new UserController().delete);

export default routes;