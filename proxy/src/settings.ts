import { config } from 'dotenv';
import { ISettings } from './shared/interfaces';

const env: any = config().parsed;
const values = process.env.NODE_ENV === 'production' ? { ...env } : {};

const settings: ISettings = {
  port: values.PORT || 3001,
  mainHost: values.MAIN_HOST || 'localhost',
  authorization: values.SECRET
};

export { settings };
