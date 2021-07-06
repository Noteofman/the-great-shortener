
// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginNotFoundErr = 'We couldn\'t find that user in our system.';
export const loginInvalidCredsErr = 'Your username or password was incorrect.';
export const registerDuplicateErr = 'A user with this email address already exists.';
export const genericLinkCreateErr = 'An error occurred while creating that link.';
export const genericUnauthorised = 'You are not authorised to view this resource.';
export const genericServerError = 'An error occurred, sorry about that.';

// Numbers
export const pwdSaltRounds = 12;

// Header Properties
export const headerProps = Object.freeze({
    key: 'Authorization',
    options: {
        maxAge: Number(process.env.JWT_EXP),
    }
});
