import express, { Router } from 'express';

import { withHttpService } from '../shared/utils/withHttpService';
import { IRouterBuilder } from '../shared/interfaces/IRouterBuilder';

export const messagesRoutes: IRouterBuilder = (getState: Function): Router => {
  const router = express.Router();
  const messagesService = withHttpService('messages', getState);

  router.post('/', async (req, res) => {
    const result = await messagesService.getConfidentMessage(req.body);
    res.json(result);
  });

  return router;
};
