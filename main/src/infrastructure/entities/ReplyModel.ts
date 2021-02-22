import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import { IReply } from '../../domains/replies/types';

export interface IReplyModel extends Document, IReply {}

let schema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  modifiedAt: {
    type: Date,
    required: false
  }
});

export default mongoose.model<IReplyModel>('Reply', schema);
