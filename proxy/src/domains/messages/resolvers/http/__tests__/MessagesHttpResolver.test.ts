import { MessagesHttpResolver } from '../MessagesHttpResolver';
import {IMainClient} from "../../../../../api/http/clients/main/MainClient";
import {IIntentsClient} from "../../../../../api/http/clients/intents/IntentsClient";

const mockGetIntentsMock = jest.fn();
const mockGetRepliesMock = jest.fn();

const mockMainClient: IMainClient = {
  name: 'main',
  getReply: jest.fn(),
  getReplies: mockGetRepliesMock,
  createReply: jest.fn(),
  updateReply: jest.fn(),
  deleteReply: jest.fn()
};

const mockIntentsClient: IIntentsClient = {
  name: 'intents',
  getIntents: mockGetIntentsMock,
};

describe('RepliesHttpResolver', () => {
  let resolver: MessagesHttpResolver;

  const payload = {
    botId: "5f74865056d7bb000fcd39ff",
    message: "Hello this is a chat message",
    conversationId: "1234567890"
  }

  beforeEach(async () => {
    resolver = new MessagesHttpResolver(mockMainClient, mockIntentsClient);

    mockGetIntentsMock.mockResolvedValue({
      intents: [{
        name: 'Greetings',
        confidence: '0.81'
      }]
    })

    mockGetRepliesMock.mockResolvedValue({
      data: [{
        "_id": "6032f6e81a403027d3c05ce3",
        "name": "I want to speak with a human",
        "value": "Greetings my friend",
        "confidence": 0.81,
        "__v": 0
      }],
      success: true
    })
  });

  afterEach(async () => {
    mockGetIntentsMock.mockReset()
    mockGetRepliesMock.mockReset()
  })

  it('calls Intents and Main Clients methods with right params', async () => {

    await resolver.getConfidentMessage(payload);

    expect(mockGetIntentsMock).toBeCalledWith(payload);
    expect(mockGetRepliesMock).toBeCalledWith({name: 'Greetings'});
  });

  it('throws an Error if no intents returned', async () => {

    mockGetIntentsMock.mockResolvedValue({intents: []})

    expect.assertions(1)
    resolver.getConfidentMessage(payload).catch(error => {
      expect(error.message).toEqual(`No intents related to message "${payload.message}"`)
    })
  });

  it('throws an Error if Main Client return error', async () => {

    mockGetRepliesMock.mockResolvedValue({
      error: {
        message: 'Error from Main Client'
      },
      success: false
    })

    expect.assertions(1)
    resolver.getConfidentMessage(payload).catch(error => {
      expect(error.message).toEqual('Error from Main Client')
    })
  });

  it('throws an Error if Main Client return empty data', async () => {

    mockGetRepliesMock.mockResolvedValue({
      data: [],
      success: true
    })

    expect.assertions(1)
    resolver.getConfidentMessage(payload).catch(error => {
      expect(error.message).toEqual(`No Reply for message "${payload.message}" saved in system`)
    })
  });
});
