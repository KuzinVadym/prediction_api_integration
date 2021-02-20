import { IConnectionSettings } from '../interfaces';
import { connectDB, disconnectDB } from '../../infrastructure/database/config';
import { truncateTables } from './truncateTables';

const testDBSettings: IConnectionSettings = {
  database: 'k2',
  host: 'localhost',
  port: '27017'
};

export function setupDatabase(): void {
  beforeAll(async () => {
    await connectDB(testDBSettings);
    await truncateTables();
  });

  afterEach(async () => {
    await truncateTables();
  });

  afterAll(async () => {
    await disconnectDB();
  });
}
