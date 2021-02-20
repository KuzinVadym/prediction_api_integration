import { config } from 'dotenv';
import { ISettings } from './shared/interfaces';

const env: any = config().parsed;
const values = process.env.NODE_ENV === 'production' ? { ...env } : {};

const settings: ISettings = {
  port: values.PORT || 3333,
  database: {
    database: values.MYSQL_DATABASE || 'k2',
    host: values.DB_HOST || 'localhost',
    port: values.DB_PORT || '27017'
  }
};

export { settings };
