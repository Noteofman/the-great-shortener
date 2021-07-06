import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import StatusCodes from 'http-status-codes';

import User from '@daos/UserDao';
import { JwtService } from '@shared/JwtService';
import {
    loginNotFoundErr,
    registerDuplicateErr,
    loginInvalidCredsErr,
} from '@shared/constants';
import {formatErrors} from "@shared/functions";

const jwtService = new JwtService();
const { OK, FORBIDDEN, UNAUTHORIZED } = StatusCodes;

/**
 * Register a user and return transformed user.
 *
 * @param req
 * @param res
 */
export async function register(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const currentUser = await User.findOne({email});

    if (currentUser) {
        return res.status(FORBIDDEN).json(formatErrors([registerDuplicateErr]));
    } else {
        const user = await new User({ email, name, password }).save();

        const jwt = await jwtService.getJwt({
            email: user.email,
        });

        return res.status(OK).send({ "jwt": jwt, user: user.toObject() });
    }
}

/**
 * Login in a user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Fetch user
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(UNAUTHORIZED).json(formatErrors([loginNotFoundErr]));
    }

    // Check password
    const pwdPassed = await bcrypt.compare(password, user.password);

    if (!pwdPassed) {
        return res.status(UNAUTHORIZED).json(formatErrors([loginInvalidCredsErr]));
    }

    const jwt = await jwtService.getJwt({
        email: user.email,
    });

    return res.status(OK).send({ "jwt": jwt, user: user.toObject() });
}
