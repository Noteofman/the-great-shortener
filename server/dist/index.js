"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("./pre-start"); // Must be the first import
const _server_1 = __importDefault(require("@server"));
const Logger_1 = __importDefault(require("@shared/Logger"));
// Start the server
const port = Number(process.env.PORT || 3000);
boostrapServer();
function boostrapServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setupMongoose();
        const server = _server_1.default.listen(port, () => {
            Logger_1.default.info('Express server started on port: ' + port);
        });
        process.on("SIGINT", () => onTerminateProcess(server));
        process.on("SIGTERM", () => onTerminateProcess(server));
    });
}
function setupMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });
}
function onTerminateProcess(server) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        server.close();
    });
}
