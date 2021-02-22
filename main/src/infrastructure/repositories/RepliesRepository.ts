import { IRepliesRepository } from '../../domains/replies/interfaces/IRepliesRepository';
import { IReply } from '../../domains/replies/types';
import ReplyModel from '../entities/ReplyModel';

export class RepliesRepository implements IRepliesRepository {
  async findById(id: string): Promise<IReply> {
    return ReplyModel.findById(id);
  }
  async findOne(filters?: Partial<IReply>): Promise<IReply> {
    return ReplyModel.findOne(filters || {});
  }

  async find(filters?: Partial<IReply>): Promise<IReply[] | []> {
    return ReplyModel.find(filters || {});
  }

  async create(payload: Omit<IReply, '_id'>): Promise<IReply> {
    return ReplyModel.create(payload);
  }

  async update(id: string, payload: Partial<IReply>): Promise<IReply> {
    return ReplyModel.findOneAndUpdate({ _id: id }, payload, { new: true });
  }

  async delete(id: string): Promise<IReply> {
    return ReplyModel.findOneAndDelete({ _id: id });
  }
}
