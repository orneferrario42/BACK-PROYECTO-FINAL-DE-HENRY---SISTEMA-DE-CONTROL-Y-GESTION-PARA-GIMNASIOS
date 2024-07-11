import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
//import { url } from 'inspector';
// import path from "path";
// import { Products } from "src/products/products.entity";
// import { Users } from "src/users/users.entity";
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  // host:'postgresbd',
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Desactiva la verificación del certificado
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  // logging: true,
  // synchronize: true,
  // dropSchema: true,
};
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
