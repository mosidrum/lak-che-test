import express from "express";
import cors from 'cors';
import AppDataSource from "./data-source";
import helmet from "helmet";
import envConfig from "./config/envConfig";

const {PORT} = envConfig
export const main = async () => {
    try {
        try {
            await AppDataSource.initialize();
            console.log('Database connection established successfully 🚀');
        } catch (error) {
            console.log('Failed to initialize AppDataSource',error);
        }
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(helmet());

        app.listen(PORT, () => {
            console.log(`Server listening on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Failed to initialize app',error);
    }
}

main();
