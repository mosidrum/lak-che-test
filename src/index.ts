import express from "express";
import cors from 'cors';
import AppDataSource from "./data-source";
import helmet from "helmet";
import envConfig from "./config/envConfig";
import {logger} from "./services";
import {responseLogger} from "./middleware";
import homepageRoute from "./routes/homepage.route";

const {PORT} = envConfig

export const main = async () => {
    try {
        try {
            await AppDataSource.initialize();
            logger.info('Database connection established successfully 🚀');
        } catch (error) {
            logger.error('Failed to initialize AppDataSource',error);
        }
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(helmet());
        app.use(responseLogger)
        app.use('/', homepageRoute)

        app.listen(PORT, () => {
            logger.info(`Server listening on port http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to initialize app',error);
    }
}

main();
