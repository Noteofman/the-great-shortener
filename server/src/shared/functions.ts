import { nanoid } from "nanoid";
import logger from './Logger';

interface ErrorsResponse {
    errors: Array<string>
}

interface ShortLink {
    id: string,
    shortenedLink: string,
}

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};


export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

// TODO Needs expansion for more formal error response handling.
export function formatErrors(errors: Array<string>) : ErrorsResponse {
    return { errors: errors };
}

export function createShortLink(length = 8): ShortLink {
    const id = nanoid(length);
    const shortenedLink = process.env.SHORTENED_BASE_URL + id;

    return { id, shortenedLink } as ShortLink;
}
