import mongoose from "mongoose";
import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import http from "http";


// Start the server
const port = Number(process.env.PORT || 3000);

boostrapServer()

async function boostrapServer() {
    await setupMongoose();

    const server: http.Server = app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });

    process.on("SIGINT", () => onTerminateProcess(server));
    process.on("SIGTERM", () => onTerminateProcess(server));
}

async function setupMongoose() {
    await mongoose.connect(
        process.env.MONGO_URI as string,
        { useNewUrlParser: true, useUnifiedTopology: true });
}

async function onTerminateProcess(server: http.Server) {
    await mongoose.disconnect();

    server.close();
}
