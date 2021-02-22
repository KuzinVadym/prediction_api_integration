import { IState } from './IState';
import { IMainRoutes } from './IMainRoutes';
import {ICreateHttpClients} from "../../api/http/clients";
import {ICreateHttpServices} from "../../domains";
import {Express} from "express";

export interface IRootService {
  init: () => Promise<void>;
  initTest: (mainRoutes: IMainRoutes) => Express;
  getState: () => IState;
  withHttpServices: (createHttpServices: ICreateHttpServices) => Promise<void>;
  withHttpClients: (createHttpClients: ICreateHttpClients) => Promise<void>
  withRest: (mainRoutes: IMainRoutes) => Promise<void>;
  listen: () => void;
}
