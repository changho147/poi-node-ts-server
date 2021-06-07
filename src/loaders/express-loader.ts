import path from "path";
import express, { Express } from "express";
import helmet from "helmet";
import router from "@/apis";
import config from "@/configs";
import { ExpressWinston, Logger, ErrorLogger } from "./log-loader";

const expressLoader = (app: Express) => {
    app.use(helmet());
    app.use(express.static(path.join(path.resolve(), "../", "/public")));
    app.use(express.json());

    app.use(ExpressWinston.logger({
        winstonInstance: Logger
    }));

    app.use(`${config.API.PREFIX}${config.API.VERSION}`, router());

    app.use(ExpressWinston.errorLogger({
        winstonInstance: ErrorLogger
    }));
};

export default expressLoader