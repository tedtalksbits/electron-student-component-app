import path from 'path';

export const projectDir = path.dirname(require.main?.filename ?? '');
export const dbConfig: {
  host: string;
  user: string;
  password: string;
  database: string;
} = {
  host: '192.168.1.19',
  user: 'root',
  password: '#Admin1993',
  database: 'anki',
};

export type DBConfig = typeof dbConfig;
export const dbConfigPath = '/data/dbConfig.json';
