import { RepliesHttpResolver } from '../RepliesHttpResolver';
import {IMainClient} from "../../../../../api/http/clients/main/MainClient";

const getReplyMock = jest.fn();
const getRepliesMock = jest.fn();
const createReplyMock = jest.fn();
const updateReplyMock = jest.fn();
const deleteReplyMock = jest.fn();

const mockMainClient: IMainClient = {
  name: 'main',
  getReply: getReplyMock,
  getReplies: getRepliesMock,
  createReply: createReplyMock,
  updateReply: updateReplyMock,
  deleteReply: deleteReplyMock
};

describe('RepliesHttpResolver', () => {
  let resolver: RepliesHttpResolver;

  beforeEach(async () => {
    resolver = new RepliesHttpResolver(mockMainClient);
  });

  afterEach(() => {
    getReplyMock.mockReset();
    getRepliesMock.mockReset();
    createReplyMock.mockReset();
    updateReplyMock.mockReset();
    deleteReplyMock.mockReset();
  })

  it('calls Main Client getReply method with right params', async () => {
    getReplyMock.mockResolvedValue({data: {test: 'test'}, success: true })
    await resolver.getReply('1');
    expect(getReplyMock).toBeCalledWith('1');
  });

  it('calls Main Client getReplies method with right params', async () => {
    getRepliesMock.mockResolvedValue({data: {test: 'test'}, success: true })
    await resolver.getReplies({name: 'name'});
    expect(getRepliesMock).toBeCalledWith({name: 'name'});
  });

  it('calls Main Client createReply method with right params', async () => {
    const payload = { name: "I want to speak with a human", value: "Greetings my friend" }

    createReplyMock.mockResolvedValue({data: {test: 'test'}, success: true })

    await resolver.createReply(payload);

    expect(createReplyMock).toBeCalledWith(payload);
  });

  it('calls Main Client createReply method with right params', async () => {
    const payload = {
      id: 'id',
      update: {
        name: "I want to speak with a human",
        value: "Greetings my friend"
      }}

    updateReplyMock.mockResolvedValue({data: {test: 'test'}, success: true })

    await resolver.updateReply(payload);

    expect(updateReplyMock).toBeCalledWith(payload);
  });

  it('calls Main Client createReply method with right params', async () => {
    const payload = {id: 'id'}

    deleteReplyMock.mockResolvedValue({success: true })

    await resolver.deleteReply(payload.id);

    expect(deleteReplyMock).toBeCalledWith(payload.id);
  });
});
