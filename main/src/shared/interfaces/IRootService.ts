import { IServices } from '../../domains/shared/interfaces/IServices';
import { IState } from './IState';
import { IMainRoutes } from './IMainRoutes';

export interface IRootService {
  init: () => Promise<void>;
  getState: () => IState;
  withDB: (entities: Function[]) => Promise<void>;
  withHttpServices: (services: IServices) => void;
  withRest: (mainRoutes: IMainRoutes) => Promise<void>;
  listen: () => void;
}
