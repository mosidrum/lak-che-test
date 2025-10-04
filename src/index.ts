import express from "express";
import AppDataSource from "./data-source";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully here ✅");
        app.listen(PORT, () => {
            console.log(`Server is listening on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error ❌", err);
    });
