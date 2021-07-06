import { Router } from 'express';
import { body, query } from 'express-validator';
import { verifyAuthedUser } from './middleware';
import { login, register } from './Auth';
import { create, fetch } from './Links';


/** Auth routes start **/

const authRouter = Router();

authRouter.post(
    '/login',
    body('email').isEmail().isLength({max: 100}),
    body('password').isLength({ min: 5, max: 100 }).isString(),
    login,
);

authRouter.post(
    '/register',
    body('email').isEmail().isLength({max: 100, min: 1}),
    body('name').isString().isLength({max: 100, min: 1}),
    body('password').isLength({ min: 5, max: 100 }).isString(),
    register,
);

/** Auth routes end **/

/** Link routes start **/

const linkRouter = Router();

linkRouter.get(
    '/fetch',
    verifyAuthedUser,
    query('limit').isNumeric().optional().default(25),
    query('page').isNumeric().optional().default(1),
    fetch,
);

linkRouter.post(
    '/create',
    body('url').isURL().isLength({min: 12, max: 2048}),
    create,
);

/** Link routes end **/

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/links', linkRouter);

export default baseRouter;
