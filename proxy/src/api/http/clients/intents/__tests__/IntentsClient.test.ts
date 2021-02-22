import {IntentsClient} from "../IntentsClient";

jest.mock('axios');
import axios from "axios";

describe('MainClient', () => {
    let client: IntentsClient;

    const payload = {
        botId: "5f74865056d7bb000fcd39ff",
        message: "Hello this is a chat message",
        conversationId: "1234567890"
    }

    beforeEach(async () => {
        client = new IntentsClient('main', 'auth');

    });

    it('calls axios post with right params after call IntentsClient getIntents method', async () => {

        axios.post = jest.fn().mockResolvedValue({data: {test: 'test'}})
        await client.getIntents(payload);

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toBeCalledWith('https://chat.ultimate.ai/api/intents', payload, {headers: {
                authorization: expect.any(String)
            }});
    });

});
