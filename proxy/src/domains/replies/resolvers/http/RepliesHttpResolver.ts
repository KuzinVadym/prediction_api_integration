import {
  ICreateReplyPayload,
  IGetRepliesPayload, IRepliesResponse, IReply,
  IUpdateReplyPayload
} from '../../types';
import {IMainClient} from "../../../../api/http/clients/main/MainClient";

export interface IReplyHttpResolver {
  getReply(id: string): Promise<IReply[] | IReply>;
  getReplies(filters?: IGetRepliesPayload): Promise<IReply[] | IReply>;
  createReply(payload: ICreateReplyPayload): Promise<IReply[] | IReply>;
  updateReply(payload: IUpdateReplyPayload): Promise<IReply[] | IReply>;
  deleteReply(id: string): Promise<void>;
}

export class RepliesHttpResolver implements IReplyHttpResolver {
  constructor(
      private readonly mainClient: IMainClient
  ) {}

  async getReply(id: string): Promise<IReply[] | IReply> {
    const result = await this.mainClient.getReply(id);
    return this.clientResultHandler(result)
  }

  async getReplies(filters?: IGetRepliesPayload): Promise<IReply[] | IReply> {
    const result = await this.mainClient.getReplies(filters);
    return this.clientResultHandler(result)
  }

  async createReply(payload: ICreateReplyPayload): Promise<IReply[] | IReply> {
    const result = await this.mainClient.createReply(payload);
    return this.clientResultHandler(result)
  }

  async updateReply(payload: IUpdateReplyPayload): Promise<IReply[] | IReply> {
    const result = await this.mainClient.updateReply(payload);
    return this.clientResultHandler(result)
  }

  async deleteReply(id: string): Promise<void> {
    const result = await this.mainClient.deleteReply(id);
    if(!result.success){
      throw new Error(result.error.message)
    }
  }

  private clientResultHandler(result: IRepliesResponse): IReply[] | IReply {
    if(result.success){
      return result.data
    }
    throw new Error(result.error.message)
  }

}
