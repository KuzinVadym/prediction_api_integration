import { IServices } from './shared/interfaces/IServices';
import {IGetStateFunction} from "../shared/interfaces/IGetStateFunction";
import { createRepliesHttpService } from './replies/services/http';
import { createMessagesHttpService } from "./messages/services/http";

export interface ICreateHttpServices {
  (getState: IGetStateFunction): IServices;
}

export function createHttpServices(getState: IGetStateFunction): IServices {
  return {
    replies: createRepliesHttpService(getState),
    messages: createMessagesHttpService(getState)
  };
}
