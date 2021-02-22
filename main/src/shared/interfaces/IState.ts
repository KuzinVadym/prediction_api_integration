import { Logger } from 'pino';
import { IClients } from './IClients';
import { IServices } from '../../domains/shared/interfaces/IServices';

export type ILogger = Logger;

export interface IState {
  logger?: ILogger;
  httpServices: IServices;
  httpClients: IClients;
}
