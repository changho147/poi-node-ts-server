import { Router, Request, Response, NextFunction } from "express";

export default (router: Router) => {
    const route = Router();
    router.use("/auth", route);

    route.get("/auths", (req:Request, res:Response, next:NextFunction) => {
        res.write("TTT");
        res.end();
    });
}