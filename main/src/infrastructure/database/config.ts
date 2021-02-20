import { IConnectionSettings } from '../../shared/interfaces';
import { connect } from 'mongoose';

export async function connectDB(settings: IConnectionSettings) {
  await connect(
    `mongodb://${settings.host}:${settings.port}/${settings.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

export const disconnectDB = async (): Promise<void> => {};
