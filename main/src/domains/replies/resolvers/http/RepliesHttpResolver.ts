import {
  ICreateReplyPayload,
  IGetRepliesPayload,
  IReply,
  IUpdateReplyPayload
} from '../../types';
import { IRepliesRepository } from '../../interfaces/IRepliesRepository';

export interface IReplyHttpResolver {
  getReply(id: number): Promise<IReply>;
  getReplies(filters?: IGetRepliesPayload): Promise<IReply[]>;
  createReply(payload: ICreateReplyPayload): Promise<IReply>;
  updateReply(payload: IUpdateReplyPayload): Promise<IReply>;
}

export class RepliesHttpResolver implements IReplyHttpResolver {
  constructor(private readonly repliesRepo: IRepliesRepository) {}

  getReply(id: number): Promise<IReply> {
    return this.repliesRepo.findOneOrFail(id);
  }

  async getReplies(filters?: IGetRepliesPayload): Promise<IReply[]> {
    return this.repliesRepo.find(filters);
  }

  createReply(payload: ICreateReplyPayload): Promise<IReply> {
    return this.repliesRepo.create(payload);
  }

  updateReply(payload: IUpdateReplyPayload): Promise<IReply> {
    return this.repliesRepo.update(payload);
  }
}
