import pino, { Logger } from 'pino';
import { IService } from '../../../shared/interfaces/IService';
import {
  MessagesHttpResolver,
  IMessagesHttpResolver
} from '../../resolvers/http/MessagesHttpResolver';
import {IGetConfidentMessagePayload, IRepliesResponse} from '../../types';
import {IGetStateFunction} from "../../../../shared/interfaces/IGetStateFunction";
import {withHttpClients} from "../../../../shared/utils/withHttpClients";

export interface IMessagesHttpService extends IService {
  getConfidentMessage(payload: IGetConfidentMessagePayload): Promise<IRepliesResponse>;
}

export class MessagesHttpService implements IMessagesHttpService {
  logger: Logger;
  constructor(
    readonly name: string,
    readonly messagesHttpResolver: IMessagesHttpResolver
  ) {
    this.logger = pino();
  }

  async getConfidentMessage(payload: IGetConfidentMessagePayload): Promise<IRepliesResponse> {
    try {
      const result = await this.messagesHttpResolver.getConfidentMessage(payload);
      return { data: result, success: true };
    } catch (error) {
      return { error: error, success: false, status: error.status };
    }
  }
}

export function createMessagesHttpService(getState: IGetStateFunction): IMessagesHttpService {
  const mainClient = withHttpClients('main', getState)
  const intentsClient = withHttpClients('intents', getState)
  return new MessagesHttpService(
    'replies',
    new MessagesHttpResolver(mainClient, intentsClient)
  );
}
