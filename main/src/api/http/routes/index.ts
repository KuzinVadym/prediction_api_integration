import express, { Router } from 'express';
import { repliesRoutes } from './replies';
import { IMainRoutes } from '../../../shared/interfaces';

export const mainRoutes: IMainRoutes = (getState): Router => {
  const router = express.Router();

  router.use('/replies', repliesRoutes(getState));

  return router;
};
