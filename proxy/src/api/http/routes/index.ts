import express, { Router } from 'express';
import { messagesRoutes } from './messages';
import { repliesRoutes } from './replies';
import { IMainRoutes } from '../../../shared/interfaces';

export const mainRoutes: IMainRoutes = (getState): Router => {
  const router = express.Router();

  router.use('/messages', messagesRoutes(getState));
  router.use('/replies', repliesRoutes(getState));

  return router;
};
