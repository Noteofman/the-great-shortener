import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {createShortLink, formatErrors} from "@shared/functions";
import Link from '@daos/LinkDao';
import logger from "@shared/Logger";
import StatusCodes from "http-status-codes";
import {genericLinkCreateErr} from "@shared/constants";
const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

/**
 * Create a link and return link model data. Only
 * persist if a user has a current session.
 *
 * @param req
 * @param res
 */
export async function create(req: Request, res: Response) {
    const { url } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, shortenedLink } = createShortLink(8);

    try {
        const shortLinkModel = new Link({
            linkId: id,
            shortenedLink: shortenedLink,
            longLink: url,
            authorId: req.user?.email,
        })

        await shortLinkModel.save();

        return res.status(OK).send(shortLinkModel.toObject());
    } catch (err) {
        logger.err(err);
        return res.status(INTERNAL_SERVER_ERROR).send(formatErrors([genericLinkCreateErr]));
    }
}

/**
 * Fetch, paginate and return a users links.
 *
 * @param req
 * @param res
 */
export async function fetch(req: Request, res: Response) {
    const { limit, page } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const links = await Link.find({ authorId: req.user.email })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ 'createdAt': 'desc' });

        return res.status(OK).send(links);
    } catch (err) {
        logger.err(err);
        return res.status(INTERNAL_SERVER_ERROR).send(formatErrors([genericLinkCreateErr]));
    }
}

