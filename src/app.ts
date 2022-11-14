import configDb from "./utils/db/configDb";
import buildServer from "./server";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = buildServer();

const start = async () => {
    await configDb();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
