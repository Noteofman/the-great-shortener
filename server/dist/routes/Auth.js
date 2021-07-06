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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const UserDao_1 = __importDefault(require("@daos/UserDao"));
const JwtService_1 = require("@shared/JwtService");
const constants_1 = require("@shared/constants");
const functions_1 = require("@shared/functions");
const jwtService = new JwtService_1.JwtService();
const { BAD_REQUEST, OK, FORBIDDEN, UNAUTHORIZED } = http_status_codes_1.default;
/**
 * Register a user and return transformed user.
 *
 * @param req
 * @param res
 */
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name, password } = req.body;
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const currentUser = yield UserDao_1.default.findOne({ email });
        if (currentUser) {
            return res.status(FORBIDDEN).json(functions_1.formatErrors([constants_1.registerDuplicateErr]));
        }
        else {
            const user = yield new UserDao_1.default({ email, name, password }).save();
            const jwt = yield jwtService.getJwt({
                email: user.email,
            });
            return res.status(OK).send({ "jwt": jwt, user: user.toObject() });
        }
    });
}
exports.register = register;
/**
 * Login in a user.
 *
 * @param req
 * @param res
 * @returns
 */
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Fetch user
        const user = yield UserDao_1.default.findOne({ email });
        if (!user) {
            return res.status(UNAUTHORIZED).json(functions_1.formatErrors([constants_1.loginNotFoundErr]));
        }
        // Check password
        const pwdPassed = yield bcrypt_1.default.compare(password, user.password);
        if (!pwdPassed) {
            return res.status(UNAUTHORIZED).json(functions_1.formatErrors([constants_1.loginInvalidCredsErr]));
        }
        const jwt = yield jwtService.getJwt({
            email: user.email,
        });
        return res.status(OK).send({ "jwt": jwt, user: user.toObject() });
    });
}
exports.login = login;
