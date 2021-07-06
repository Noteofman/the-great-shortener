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
exports.verifyAuthedUser = exports.setUserSession = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const constants_1 = require("@shared/constants");
const JwtService_1 = require("@shared/JwtService");
const functions_1 = require("@shared/functions");
const UserDao_1 = __importDefault(require("@daos/UserDao"));
const jwtService = new JwtService_1.JwtService();
const { UNAUTHORIZED } = http_status_codes_1.default;
// Set user session if found.
const setUserSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.header(constants_1.headerProps.key);
        if (jwt) {
            const decoded = yield jwtService.decodeJwt(jwt);
            const user = yield UserDao_1.default.findOne({ email: decoded.email });
            if (user !== null) {
                req.user = user;
            }
        }
    }
    catch (err) {
        Logger_1.default.err(err);
    }
    next();
});
exports.setUserSession = setUserSession;
// Middleware to verify valid JWT
// or throw if not found or invalid.
const verifyAuthedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.header(constants_1.headerProps.key);
        if (!jwt) {
            throw Error('JWT not present in header.');
        }
        const decoded = yield jwtService.decodeJwt(jwt);
        const user = yield UserDao_1.default.findOne({ email: decoded.email });
        if (user == null) {
            throw Error("Authorised user not found.");
        }
        next();
    }
    catch (err) {
        Logger_1.default.err(err);
        return res.status(UNAUTHORIZED).json(functions_1.formatErrors([constants_1.genericUnauthorised]));
    }
});
exports.verifyAuthedUser = verifyAuthedUser;
