import { IReply } from '../types';

export interface IRepliesRepository {
  findById(id: string): Promise<IReply>;
  findOne(filters?: Partial<IReply>): Promise<IReply>;
  find(filters?: Partial<IReply>): Promise<IReply[] | []>;
  create(reply: Omit<IReply, 'id'>): Promise<IReply>;
  update(id: string, reply: Partial<IReply>): Promise<IReply>;
  delete(id: string): Promise<IReply>;
}
