import { IResponse } from '../../shared/types/IResponse';


export type IReply = {
  name: string;
  value: string;
  confidence: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export type IGetConfidentMessagePayload = {
  botId: string;
  message: string;
  conversationId: string;
}

export type ICreateReplyPayload = Omit<IReply, '_id'>;

export type IUpdateReplyPayload = {
  id: string
  update: Partial<IReply>
};

export type IGetRepliesPayload = Partial<IReply>;

export type IRepliesResponse = IResponse<IReply>;
