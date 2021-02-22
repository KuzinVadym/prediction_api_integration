import { IState } from './IState';
import { IMainRoutes } from './IMainRoutes';
import { ICreateHttpServices } from '../../domains';

export interface IRootService {
  init: () => Promise<void>;
  getState: () => IState;
  withDB: (entities: Function[]) => Promise<void>;
  withHttpServices: (createHttpServices: ICreateHttpServices) => Promise<void>;
  withRest: (mainRoutes: IMainRoutes) => Promise<void>;
  listen: () => void;
}
