import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
// import path from "path";
// import { Products } from "src/products/products.entity";
// import { Users } from "src/users/users.entity";
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  // host:'postgresbd',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: true,
  synchronize: true,
  dropSchema: true,
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
