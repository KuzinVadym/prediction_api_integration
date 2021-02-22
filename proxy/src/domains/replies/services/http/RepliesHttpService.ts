import pino, { Logger } from 'pino';
import { IService } from '../../../shared/interfaces/IService';
import {
  RepliesHttpResolver,
  IReplyHttpResolver
} from '../../resolvers/http/RepliesHttpResolver';
import {
  ICreateReplyPayload,
  IGetRepliesPayload,
  IRepliesResponse,
  IUpdateReplyPayload
} from '../../types';
import {IGetStateFunction} from "../../../../shared/interfaces/IGetStateFunction";
import {withHttpClients} from "../../../../shared/utils/withHttpClients";

export interface IRepliesHttpService extends IService {
  getReply(id: string): Promise<IRepliesResponse>;
  getReplies(filters?: IGetRepliesPayload): Promise<IRepliesResponse>;
  createReply(payload: ICreateReplyPayload): Promise<IRepliesResponse>;
  updateReply(payload: IUpdateReplyPayload): Promise<IRepliesResponse>;
  deleteReply(id: string): Promise<IRepliesResponse>;
}

export class RepliesHttpService implements IRepliesHttpService {
  logger: Logger;
  constructor(
    readonly name: string,
    readonly repliesHttpResolver: IReplyHttpResolver
  ) {
    this.logger = pino();
  }

  async getReplies(filters?: IGetRepliesPayload): Promise<IRepliesResponse> {
    try {
      const result = await this.repliesHttpResolver.getReplies(filters);
      return { data: result, success: true };
    } catch (error) {
      return { error, success: false, status: error.status };
    }
  }

  async getReply(id: string): Promise<IRepliesResponse> {
    try {
      const result = await this.repliesHttpResolver.getReply(id);
      return { data: result, success: true };
    } catch (error) {
      return { error, success: false, status: error.status };
    }
  }
  async createReply(payload: ICreateReplyPayload): Promise<IRepliesResponse> {
    try {
      const result = await this.repliesHttpResolver.createReply(payload);
      return { data: result, success: true };
    } catch (error) {
      return { error: error.message, success: false, status: error.status };
    }
  }

  async updateReply(payload: IUpdateReplyPayload): Promise<IRepliesResponse> {
    try {
      const result = await this.repliesHttpResolver.updateReply(payload);
      return { data: result, success: true };
    } catch (error) {
      return { error, success: false, status: error.status };
    }
  }

  async deleteReply(id: string): Promise<IRepliesResponse> {
    try {
      await this.repliesHttpResolver.deleteReply(id);
      return { success: true };
    } catch (error) {
      return { error, success: false, status: error.status };
    }
  }
}

export function createRepliesHttpService(getState: IGetStateFunction): IRepliesHttpService {
  const mainClient = withHttpClients('main', getState)
  return new RepliesHttpService(
    'replies',
    new RepliesHttpResolver(mainClient)
  );
}
