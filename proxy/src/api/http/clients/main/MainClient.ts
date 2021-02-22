import axios from "axios";
import {IClient} from "../shared/interfaces";
import {ICreateReplyPayload, IGetRepliesPayload, IRepliesResponse, IUpdateReplyPayload} from "./types";
import {IGetStateFunction} from "../../../../shared/interfaces/IGetStateFunction";

export interface IMainClient extends IClient {
    getReply(id: string): Promise<IRepliesResponse>;
    getReplies(filters?: IGetRepliesPayload): Promise<IRepliesResponse>;
    createReply(payload: ICreateReplyPayload): Promise<IRepliesResponse>;
    updateReply(payload: IUpdateReplyPayload): Promise<IRepliesResponse>;
    deleteReply(id: string): Promise<IRepliesResponse>;
}

export class MainClient implements IMainClient{
    constructor(
        readonly name: string,
        readonly mainHost: string
    ) {}

    async getReply(id: string): Promise<IRepliesResponse> {
        const result = await axios.get(`http://${this.mainHost}:3002/api/v1/replies/${id}`)
        return result.data
    }

    async getReplies(filters?: IGetRepliesPayload): Promise<IRepliesResponse> {
        const result = await axios.get(`http://${this.mainHost}:3002/api/v1/replies`, {params: filters})
        return result.data
    }

    async createReply(payload: ICreateReplyPayload): Promise<IRepliesResponse> {
        const result = await axios.post(`http://${this.mainHost}:3002/api/v1/replies`, payload);
        return result.data
    }

    async updateReply(payload: IUpdateReplyPayload): Promise<IRepliesResponse> {
        const result = await axios.put(`http://${this.mainHost}:3002/api/v1/replies/${payload.id}`, payload.update)
        return result.data
    }

    async deleteReply(id: string): Promise<IRepliesResponse> {
        const result = await axios.delete(`http://${this.mainHost}:3002/api/v1/replies/${id}`)
        return result.data
    }
}

export function createMainHttpClient(getState: IGetStateFunction): IMainClient {
    return new MainClient('main', getState().mainHost);
}

