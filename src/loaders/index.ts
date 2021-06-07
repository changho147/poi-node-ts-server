import { Express } from "express";
import expressLoader from "./express-loader";

export default async (app: Express) => {
    await expressLoader(app);
}