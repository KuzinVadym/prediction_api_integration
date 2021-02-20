export interface IConnectionSettings {
  database: string;
  host: string;
  port: string;
}

export interface ISettings {
  port: string;
  database: IConnectionSettings;
}
