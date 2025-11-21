import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { BookingEntity, CarEntity, PaymentEntity, UserEntity } from "./entities";

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
  entities: [UserEntity, CarEntity, BookingEntity, PaymentEntity],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
