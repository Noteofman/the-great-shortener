"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerProps = exports.pwdSaltRounds = exports.genericServerError = exports.genericUnauthorised = exports.genericLinkCreateErr = exports.registerDuplicateErr = exports.loginInvalidCredsErr = exports.loginNotFoundErr = exports.paramMissingError = void 0;
// Strings
exports.paramMissingError = 'One or more of the required parameters was missing.';
exports.loginNotFoundErr = 'We couldn\'t find that user in our system.';
exports.loginInvalidCredsErr = 'Your username or password was incorrect.';
exports.registerDuplicateErr = 'A user with this email address already exists.';
exports.genericLinkCreateErr = 'An error occurred while creating that link.';
exports.genericUnauthorised = 'You are not authorised to view this resource.';
exports.genericServerError = 'An error occurred, sorry about that.';
// Numbers
exports.pwdSaltRounds = 12;
// Header Properties
exports.headerProps = Object.freeze({
    key: 'Authorization',
    options: {
        maxAge: Number(process.env.JWT_EXP),
    }
});
