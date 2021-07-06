"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const Auth_1 = require("./Auth");
const Links_1 = require("./Links");
/** Auth routes start **/
const authRouter = express_1.Router();
authRouter.post('/login', express_validator_1.body('email').isEmail().isLength({ max: 100 }), express_validator_1.body('password').isLength({ min: 5, max: 100 }).isString(), Auth_1.login);
authRouter.post('/register', express_validator_1.body('email').isEmail().isLength({ max: 100, min: 1 }), express_validator_1.body('name').isString().isLength({ max: 100, min: 1 }), express_validator_1.body('password').isLength({ min: 5, max: 100 }).isString(), Auth_1.register);
/** Auth routes end **/
/** Link routes start **/
const linkRouter = express_1.Router();
linkRouter.get('/fetch', middleware_1.verifyAuthedUser, express_validator_1.query('limit').isNumeric().optional().default(25), express_validator_1.query('page').isNumeric().optional().default(1), Links_1.fetch);
linkRouter.post('/create', express_validator_1.body('url').isURL().isLength({ min: 12, max: 2048 }), Links_1.create);
/** Link routes end **/
const baseRouter = express_1.Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/links', linkRouter);
exports.default = baseRouter;
