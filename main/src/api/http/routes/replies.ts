import express, { Router } from 'express';

import { withHttpService } from '../shared/utils/withHttpService';
import { IRouterBuilder } from '../shared/interfaces/IRouterBuilder';

export const repliesRoutes: IRouterBuilder = (getState: Function): Router => {
  const router = express.Router();
  const repliesService = withHttpService('replies', getState);

  router.get('/:id', async (req, res) => {
    const result = await repliesService.getReply(req.params.id);
    res.json(result);
  });

  router.get('/', async (req, res) => {
    const result = await repliesService.getReplies(req.query);
    res.json(result);
  });

  router.post('/', async (req, res) => {
    const result = await repliesService.createReply(req.body);
    res.json(result);
  });

  router.put('/:id', async (req, res) => {
    const result = await repliesService.updateReply({
      id: req.params.id,
      update: req.body
    });
    res.json(result);
  });

  router.put('/:id', async (req, res) => {
    const result = await repliesService.deleteReply({
      id: req.params.id,
      update: req.body
    });
    res.json(result);
  });

  return router;
};
