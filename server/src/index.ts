import app from "./app";
import logger from "./utils/logger";
import config from "config";

const port = config.get<number>("port");

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
});
