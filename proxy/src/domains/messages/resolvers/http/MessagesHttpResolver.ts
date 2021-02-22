import {
  IGetConfidentMessagePayload,
  IReply,
} from '../../types';
import {IMainClient} from "../../../../api/http/clients/main/MainClient";
import {IIntentsClient} from "../../../../api/http/clients/intents/IntentsClient";

export interface IMessagesHttpResolver {
  getConfidentMessage(payload: IGetConfidentMessagePayload): Promise<IReply>;
}

export class MessagesHttpResolver implements IMessagesHttpResolver {
  constructor(
      private readonly mainClient: IMainClient,
      private readonly intentsClient: IIntentsClient
  ) {}

  async getConfidentMessage(payload: IGetConfidentMessagePayload): Promise<IReply> {
    const intentsResult = await this.intentsClient.getIntents(payload)

    if(intentsResult.intents.length > 0){
      const mostConfidentIntent = intentsResult.intents[0]
      const result = await this.mainClient.getReplies({name: mostConfidentIntent.name});

      if(result.success){
        if(result.data[0]){
          return result.data[0]
        }
        throw new Error(`No Reply for message "${payload.message}" saved in system`)
      }
      throw new Error(result.error.message)
    } else {
      throw new Error(`No intents related to message "${payload.message}"`)
    }
  }
}
