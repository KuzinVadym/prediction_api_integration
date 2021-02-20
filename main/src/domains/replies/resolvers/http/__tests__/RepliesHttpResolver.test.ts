import { RepliesHttpResolver } from '../RepliesHttpResolver';
import { IRepliesRepository } from '../../../interfaces/IRepliesRepository';
import { setupDatabase } from '../../../../../shared/tests/setupDB';

setupDatabase();

const mockFindOneOrFailReply = jest.fn();
const mockFindReplies = jest.fn();

const mockRepliesRepo: IRepliesRepository = {
  find: mockFindReplies,
  findOneOrFail: mockFindOneOrFailReply,
  create: jest.fn(),
  update: jest.fn()
};

describe('RepliesHttpResolver', () => {
  let resolver: RepliesHttpResolver;

  beforeEach(async () => {
    resolver = new RepliesHttpResolver(mockRepliesRepo);
  });

  it('calls Replies Repository find method with undefined', async () => {
    await resolver.getReplies();

    expect(mockRepliesRepo.find).toBeCalledWith(undefined);
  });

  it('calls Replies Repository findOneOrFail method with right params', async () => {
    await resolver.getReply(1);

    expect(mockRepliesRepo.findOneOrFail).toBeCalledWith(1);
  });
});
