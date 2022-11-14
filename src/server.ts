import express from "express";
import router from "./routes";
import errorMiddleware from "./utils/middlewares/error.middleware";

function buildServer() {
    const app = express();

    app.use(express.json());
    app.use("/", router);
    app.use(errorMiddleware);

    return app;
}

export default buildServer;
