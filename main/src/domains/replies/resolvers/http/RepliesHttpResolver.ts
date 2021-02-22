import {
  ICreateReplyPayload,
  IGetRepliesPayload,
  IReply,
  IUpdateReplyPayload
} from '../../types';
import { IRepliesRepository } from '../../interfaces/IRepliesRepository';

export interface IReplyHttpResolver {
  getReply(id: string): Promise<IReply>;
  getReplies(filters?: IGetRepliesPayload): Promise<IReply[]>;
  createReply(payload: ICreateReplyPayload): Promise<IReply>;
  updateReply(payload: IUpdateReplyPayload): Promise<IReply>;
  deleteReply(id: string): Promise<IReply>;
}

export class RepliesHttpResolver implements IReplyHttpResolver {
  constructor(private readonly repliesRepo: IRepliesRepository) {}

  async getReply(id: string): Promise<IReply> {
    return this.repliesRepo.findById(id);
  }

  async getReplies(filters?: IGetRepliesPayload): Promise<IReply[]> {
    return this.repliesRepo.find(filters);
  }

  async createReply(payload: ICreateReplyPayload): Promise<IReply> {
    return this.repliesRepo.create(payload);
  }

  async updateReply(payload: IUpdateReplyPayload): Promise<IReply> {
    return this.repliesRepo.update(payload.id, payload.update);
  }

  async deleteReply(id: string): Promise<IReply> {
    return this.repliesRepo.delete(id);
  }
}
