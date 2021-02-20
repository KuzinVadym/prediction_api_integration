import { prop, getModelForClass } from '@typegoose/typegoose';
import { IReply } from '../../domains/replies/types';

class Reply implements IReply {
  id?: number;

  @prop({ required: true })
  public name: string;

  @prop({ type: () => String, required: true })
  public value: string;

  @prop({ type: () => String })
  public confidence: string;
}

export const ReplyEntity = getModelForClass(Reply);
