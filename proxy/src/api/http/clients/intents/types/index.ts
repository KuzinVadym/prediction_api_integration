
export type IIntent = {
    confidence: number;
    name: string;
}

export type IGetIntentsPayload = {
    botId: string;
    message: string;
    conversationId: string;
}

export type IGetIntentsResponse = {
    intents: IIntent[];
    entities: any[];
}

