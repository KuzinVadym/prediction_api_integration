import { IReply } from '../types';

export interface IRepliesRepository {
  findOneOrFail(id: number): Promise<IReply>;
  find(filters?: Partial<IReply>): Promise<IReply[] | []>;
  create(reply: Omit<IReply, 'id'>): Promise<IReply>;
  update(reply: Partial<IReply>): Promise<IReply>;
}
