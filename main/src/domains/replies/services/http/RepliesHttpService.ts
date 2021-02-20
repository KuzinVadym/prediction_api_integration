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
import { RepliesRepository } from '../../../../infrastructure/repositories/RepliesRepository';

export interface IRepliesHttpService extends IService {
  getReply(id: number): Promise<IRepliesResponse>;
  getReplies(filters?: IGetRepliesPayload): Promise<IRepliesResponse>;
  createReply(payload: ICreateReplyPayload): Promise<IRepliesResponse>;
  updateReply(payload: IUpdateReplyPayload): Promise<IRepliesResponse>;
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

  async getReply(id: number): Promise<IRepliesResponse> {
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
      return { error, success: false, status: error.status };
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
}

export function createRepliesHttpService(): IRepliesHttpService {
  const commitsRepo = new RepliesRepository();
  return new RepliesHttpService(
    'replies',
    new RepliesHttpResolver(commitsRepo)
  );
}
