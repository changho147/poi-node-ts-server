import express, { Express } from "express";
import config from "./configs";
import loaders from "./loaders";

class App {
    private readonly app: Express;
    constructor() {
        this.app = express();
    }

    async bootstrap() {
        await loaders(this.app);
        this.app.listen(config.APP.PORT, () => {
            console.log("SERVER ON");
        });
    }
}

export default App;