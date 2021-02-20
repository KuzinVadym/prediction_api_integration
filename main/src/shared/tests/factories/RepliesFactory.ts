import { IReply } from '../../../domains/replies/types';

export class RepliesFactory {
  static async create(attr?: Partial<IReply>): Promise<IReply> {
    return Promise.resolve({
      name: 'name',
      value: 'value',
      confidence: 'confidence'
    });
  }
  static async createList(
    quantity: number,
    attr?: Partial<IReply>
  ): Promise<IReply[]> {
    return Promise.resolve([
      {
        name: 'name',
        value: 'value',
        confidence: 'confidence'
      }
    ]);
  }
}
