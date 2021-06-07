import config from "@/configs";
import expressWinston from "express-winston";
import winston, { createLogger, format, Logger } from "winston";
import { Console, DailyRotateFile } from "winston/lib/winston/transports";
import "winston-daily-rotate-file";

const isProduction:boolean = process.env.ENV === "production";
const transports:any = {
    console: new Console({
        level: config.LOG.LEVEL,
        handleExceptions: true
    }),
    dailyRotateFile: new DailyRotateFile({
        level: config.LOG.LEVEL,
        dirname: config.LOG.DIR,
        filename: "application-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        handleExceptions: true,
        zippedArchive: false,
        maxFiles: "10d"
    })
};

const logger:Logger = createLogger({
    transports: [
        isProduction ? transports.dailyRotateFile : transports.console
    ],
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(({timestamp, level, message, ...metadata}) => {
            return `[${timestamp}][${level}] ${message} ${metadata?.meta?.req?.headers ? `\n requestHeaders: ${JSON.stringify(metadata.meta.req.headers)}`: ""} ${metadata?.meta?.req?.query ? `\n requestParameters: ${JSON.stringify(metadata.meta.req.query)}` : ""} ${metadata?.meta?.req?.body ? `\n requestBody: ${JSON.stringify(metadata.meta.req.body)}` : ""} ${metadata?.meta?.res ? `\n response: ${JSON.stringify(metadata.meta.res)}` : ""}`;
        })
    )
});

const errorLogger:Logger = winston.createLogger({
    transports: [
        isProduction ? transports.dailyRotateFile : transports.console
    ],
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(({timestamp, level, ...metadata}) => {
            const error = metadata?.meta ? metadata.meta : metadata;
            return `[${timestamp}][${level}] ${error.stack ? `\n ${error.stack}` : ""}`;
        })
    )
});

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

export {
    expressWinston as ExpressWinston,
    logger as Logger,
    errorLogger as ErrorLogger
}