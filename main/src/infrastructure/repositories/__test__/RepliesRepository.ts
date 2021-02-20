import { setupDatabase } from '../../../shared/tests/setupDB';
import { RepliesRepository } from '../RepliesRepository';
import { RepliesFactory } from '../../../shared/tests/factories/RepliesFactory';

setupDatabase();

describe('TasksRepository', () => {
  let repository: RepliesRepository;

  beforeEach(() => {
    repository = new RepliesRepository();
  });

  it('creates Reply', async () => {
    const reply = await RepliesFactory.create();
    const attr = {
      name: 'name',
      value: 'value',
      confidence: 'confidence'
    };

    const result = await repository.create(attr);

    expect(result).toMatchObject({});
  });

  it('finds Reply by Id', async () => {
    const reply = await RepliesFactory.create();

    const result = await repository.findOneOrFail(reply.id);

    expect(result).toMatchObject(reply);
  });

  it('finds Replies', async () => {
    await RepliesFactory.createList(3);

    const result = await repository.find();

    expect(result.length).toEqual(3);
  });

  it('updates Reply', async () => {
    const reply = await RepliesFactory.create();
    const updateAttr = {};

    const result = await repository.update(updateAttr);

    expect(result).toMatchObject({});
  });
});
