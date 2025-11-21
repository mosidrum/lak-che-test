import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import {AccessPin, Door, Property, User} from "../entities";
import {CallLog} from "../entities/CallLogEntity";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Door, AccessPin, CallLog, Property],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
