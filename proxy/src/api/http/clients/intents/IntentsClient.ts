import {IClient} from "../shared/interfaces/IClient";
import {IGetIntentsPayload, IGetIntentsResponse} from "./types";
import axios from "axios";
import {IGetStateFunction} from "../../../../shared/interfaces/IGetStateFunction";

export interface IIntentsClient extends IClient {
    getIntents(payload: IGetIntentsPayload): Promise<IGetIntentsResponse>;
}

export class IntentsClient implements IIntentsClient{
    constructor(
        readonly name: string,
        readonly authorization: string
    ) {}

    public async getIntents(
        payload: IGetIntentsPayload
    ): Promise<IGetIntentsResponse> {
        const result = await axios.post('https://chat.ultimate.ai/api/intents', payload, {headers: {
                authorization: this.authorization
            }})
        return result.data
    }
}

export function createIntentsHttpClient(getState: IGetStateFunction): IIntentsClient {
    return new IntentsClient('intents', getState().authorization);
}