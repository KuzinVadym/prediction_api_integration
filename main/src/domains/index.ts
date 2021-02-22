import { IServices } from './shared/interfaces/IServices';
import { createRepliesHttpService } from './replies/services/http';
import { IGetStateFunction } from '../shared/interfaces/IGetStateFunction';

export interface ICreateHttpServices {
  (getState: IGetStateFunction): IServices;
}

export function createHttpServices(getState: IGetStateFunction): IServices {
  return {
    replies: createRepliesHttpService(getState)
  };
}
