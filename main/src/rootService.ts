import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import {
  ILogger,
  IState,
  ISettings,
  IRootService,
  IMainRoutes
} from './shared/interfaces';
import { IServices } from './domains/shared/interfaces/IServices';
import { connectDB } from './infrastructure/database/config';
import { IClients } from './shared/interfaces/IClients';
import { ICreateHttpServices } from './domains';

export class RootService implements IRootService {
  private app: Express;
  private logger: ILogger;
  private settings: ISettings;
  private httpServices: IServices;
  private httpClients: IClients;

  constructor(settings: ISettings, logger: ILogger) {
    this.settings = settings;
    this.logger = logger;
  }

  public getState(): IState {
    return {
      logger: this.logger,
      httpServices: this.httpServices,
      httpClients: this.httpClients
    };
  }

  public async withDB(): Promise<void> {
    await connectDB(this.settings.database);
    this.logger.info('Connection with DB established');
  }

  async withHttpServices(createHttpServices: ICreateHttpServices) {
    const getState = () => {
      return this.getState();
    };
    this.httpServices = createHttpServices(getState);
  }

  async init(): Promise<void> {
    this.logger.info('Init Express App');
    this.app = express();

    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(cors());
  }

  async withRest(mainRoutes: IMainRoutes): Promise<void> {
    const getState = () => {
      return this.getState();
    };
    const mainRouter = mainRoutes(getState);
    this.app.use('/api/v1', mainRouter);
  }

  listen(): void {
    this.app.listen(this.settings.port, () => {
      this.logger.info(
        `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${this.settings.port} in your browser.`
      );
    });
  }
}
