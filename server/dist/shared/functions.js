"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortLink = exports.formatErrors = exports.getRandomInt = exports.pErr = void 0;
const nanoid_1 = require("nanoid");
const Logger_1 = __importDefault(require("./Logger"));
const pErr = (err) => {
    if (err) {
        Logger_1.default.err(err);
    }
};
exports.pErr = pErr;
const getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.getRandomInt = getRandomInt;
// TODO Needs expansion for more formal error response handling.
function formatErrors(errors) {
    return { errors: errors };
}
exports.formatErrors = formatErrors;
function createShortLink(length = 8) {
    const id = nanoid_1.nanoid(length);
    const shortenedLink = process.env.SHORTENED_BASE_URL + id;
    return { id, shortenedLink };
}
exports.createShortLink = createShortLink;
