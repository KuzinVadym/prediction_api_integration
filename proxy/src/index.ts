import pino from 'pino';
import { settings } from './settings';
import { RootService } from './rootService';
import { createHttpServices } from './domains';
import {createHttpClients} from "./api/http/clients";
import { mainRoutes } from './api/http/routes';

const logger = pino();

(async () => {
  try {
    const appSrv = new RootService(settings, logger);
    logger.info('Starting HTTP server');

    await appSrv.withHttpClients(createHttpClients);

    await appSrv.withHttpServices(createHttpServices);

    await appSrv.init();

    await appSrv.withRest(mainRoutes);

    appSrv.listen();
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.');
  }
})();
