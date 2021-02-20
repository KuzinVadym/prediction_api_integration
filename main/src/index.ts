import pino from 'pino';
import { settings } from './settings';
import { RootService } from './rootService';
import { createHttpServices } from './domains';
import { mainRoutes } from './api/http/routes';

const logger = pino();

(async () => {
  try {
    const appSrv = new RootService(settings, logger);
    logger.info('Starting HTTP server');

    await appSrv.withDB();

    appSrv.withHttpServices(createHttpServices());

    await appSrv.init();

    await appSrv.withRest(mainRoutes);

    appSrv.listen();
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.');
  }
})();
