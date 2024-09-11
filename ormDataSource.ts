import * as dotenv from 'dotenv';
import ormConfig from './src/config/ormconfig';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export default new DataSource({
  ...(<PostgresConnectionOptions>ormConfig),
  migrationsTableName: 'test_api_migrations',
  migrationsTransactionMode: 'each',
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/src/**/subscriber/*.entity{.ts,.js}'],
  logging: true,
});
