import { IRepliesRepository } from '../../domains/replies/interfaces/IRepliesRepository';
import { IReply } from '../../domains/replies/types';

export class RepliesRepository implements IRepliesRepository {
  findOneOrFail(id: number): Promise<IReply> {
    return Promise.resolve(undefined);
  }

  find(filters?: Partial<IReply>): Promise<IReply[] | []> {
    return Promise.resolve(undefined);
  }

  create(reply: Omit<IReply, 'id'>): Promise<IReply> {
    return Promise.resolve(undefined);
  }

  update(reply: Partial<IReply>): Promise<IReply> {
    return Promise.resolve(undefined);
  }
}
