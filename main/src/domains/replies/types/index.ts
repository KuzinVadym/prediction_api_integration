import { IResponse } from '../../shared/types/IResponse';

export type IReply = {
  id?: number;
  name: string;
  value: string;
  confidence: string;
};

export type ICreateReplyPayload = Omit<IReply, 'id'>;

export type IUpdateReplyPayload = Partial<IReply>;

export type IGetRepliesPayload = Partial<IReply>;

export type IRepliesResponse = IResponse<IReply>;
