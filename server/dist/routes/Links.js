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
exports.fetch = exports.create = void 0;
const express_validator_1 = require("express-validator");
const functions_1 = require("@shared/functions");
const LinkDao_1 = __importDefault(require("@daos/LinkDao"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("@shared/constants");
const { OK, INTERNAL_SERVER_ERROR } = http_status_codes_1.default;
/**
 * Create a link and return link model data. Only
 * persist if a user has a current session.
 *
 * @param req
 * @param res
 */
function create(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, shortenedLink } = functions_1.createShortLink(8);
        try {
            const shortLinkModel = new LinkDao_1.default({
                linkId: id,
                shortenedLink: shortenedLink,
                longLink: url,
                authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email,
            });
            yield shortLinkModel.save();
            return res.status(OK).send(shortLinkModel.toObject());
        }
        catch (err) {
            Logger_1.default.err(err);
            return res.status(INTERNAL_SERVER_ERROR).send(functions_1.formatErrors([constants_1.genericLinkCreateErr]));
        }
    });
}
exports.create = create;
/**
 * Fetch, paginate and return a users links.
 *
 * @param req
 * @param res
 */
function fetch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, page } = req.query;
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const links = yield LinkDao_1.default.find({ authorId: req.user.email })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ 'createdAt': 'desc' });
            return res.status(OK).send(links);
        }
        catch (err) {
            Logger_1.default.err(err);
            return res.status(INTERNAL_SERVER_ERROR).send(functions_1.formatErrors([constants_1.genericLinkCreateErr]));
        }
    });
}
exports.fetch = fetch;
