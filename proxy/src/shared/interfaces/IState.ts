import { Logger } from 'pino';
import {IClients} from "./IClients";
import {IServices} from "../../domains/shared/interfaces/IServices";

export type ILogger = Logger;

export interface IState {
  authorization: string;
  logger?: ILogger;
  httpServices: IServices;
  httpClients: IClients;
  mainHost: string;
}
