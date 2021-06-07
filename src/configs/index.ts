import { resolve } from "path";
import { config } from "dotenv";

const nodeEnv = process.env.ENV;
const envMap: { [k: string]: string } = {
    "local": ".env.local",
    "development": ".env.dev",
    "production": ".env.prod"
};

if (!nodeEnv)
    throw new Error("Couldn't find ENV Property.");

const env = config({
    path: resolve(process.cwd(), `.env/${envMap[nodeEnv]}`)
});

if (env.error)
    throw new Error("Couldn't find .env file.");

export default {
    APP: {
        PORT: process.env.APP_PORT
    },
    API: {
        PREFIX: process.env.API_PREFIX,
        VERSION: process.env.API_VERSION
    },
    LOG: {
        LEVEL: process.env.LOG_LEVEL,
        DIR: process.env.LOG_DIR
    }
}