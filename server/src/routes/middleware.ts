import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import logger from '@shared/Logger';
import { headerProps, genericUnauthorised, genericServerError } from '@shared/constants';
import { JwtService } from '@shared/JwtService';
import {formatErrors} from "@shared/functions";
import User from '@daos/UserDao';


const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;

// Set user session if found.
export const setUserSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.header(headerProps.key);

        if (jwt) {
            const decoded = await jwtService.decodeJwt(jwt);

            const user = await User.findOne({ email: decoded.email });

            if (user !== null) {
                req.user = user;
            }
        }

    } catch (err) {
        logger.err(err);
    }

    next();
};


// Middleware to verify valid JWT
// or throw if not found or invalid.
export const verifyAuthedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwt = req.header(headerProps.key);

        if (!jwt) {
            throw Error('JWT not present in header.');
        }

        const decoded = await jwtService.decodeJwt(jwt);

        const user = await User.findOne({ email: decoded.email });

        if (user == null) {
            throw Error("Authorised user not found.");
        }

        next();
    } catch (err) {
        logger.err(err);

        return res.status(UNAUTHORIZED).json(formatErrors([genericUnauthorised]));
    }
};
