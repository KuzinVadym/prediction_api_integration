import express, { Router } from 'express';

import { withHttpService } from '../shared/utils/withHttpService';
import { IRouterBuilder } from '../shared/interfaces/IRouterBuilder';

export const repliesRoutes: IRouterBuilder = (getState: Function): Router => {
  const router = express.Router();
  const repliesService = withHttpService('replies', getState);

  router.get('/', async (req, res) => {
    const result = await repliesService.getReplies();
    res.json(result);
  });

  return router;
};
